'use strict';

import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
  HINT_QUIZ_BUTTON_ID,
  CLOSE_ELEMENT_ID,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';
import { FINISH_QUIZ_BUTTON_ID } from '../constants.js';
import { initFinishPage } from './finishPage.js';
import { createHintElement } from '../views/hintElement.js';
import { saveSelectedAnswer } from './utilities.js';

export const initQuestionPage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const questionsArray = JSON.parse(
    window.sessionStorage.getItem('questionsArray')
  );

  const currentQuestionIndex = JSON.parse(
    window.sessionStorage.getItem('currentQuestionIndex')
  );
  const currentQuestion = questionsArray[currentQuestionIndex];


   let wrongAnswers = JSON.parse(window.sessionStorage.getItem('wrongAnswers')) || 0;

   let rightAnswers = JSON.parse(window.sessionStorage.getItem('rightAnswers')) || 0;
   let skippedQuestions = JSON.parse(
    window.sessionStorage.getItem('skippedQuestions')) || 0;




  const amount = questionsArray.length;
  const questionNumber = `Question [ ${currentQuestionIndex + 1} / ${amount} ]`;
  const score = `Score &nbsp&nbsp [ ${rightAnswers} / ${amount} ]`;
  const wrongAnswer = `&nbspWrong &nbsp [ ${wrongAnswers} / ${amount} ]`;
  const skipped = `Skipped [ ${skippedQuestions} / ${amount} ]`;

  const questionElement = createQuestionElement(
    currentQuestion.text,
    questionNumber,
    score,
    wrongAnswer,
    skipped
  );
  userInterface.appendChild(questionElement);

  const answersListElement = document.getElementById(ANSWERS_LIST_ID);

  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
    const answerElement = createAnswerElement(key, answerText);
    answerElement.id = key;

    answersListElement.appendChild(answerElement);

    const checkAnswer = () => {












      if (questionsArray[currentQuestionIndex].selected === null) {
        if (answerElement.id === questionsArray[currentQuestionIndex].correct) {
          answerElement.classList.add('right-answer');
          saveSelectedAnswer(currentQuestionIndex, answerElement.id);

          questionsArray[currentQuestionIndex].selected = answerElement.id;

          rightAnswers++;
          window.sessionStorage.setItem(
            'rightAnswers',
            JSON.stringify(rightAnswers)
          );

        } else {
          answerElement.classList.add('wrong-answer');
          saveSelectedAnswer(currentQuestionIndex, answerElement.id);
          document
            .getElementById(questionsArray[currentQuestionIndex].correct)
            .classList.add('right-answer');
          questionsArray[currentQuestionIndex].selected = answerElement.id;

          wrongAnswers++;
          
          window.sessionStorage.setItem(
            'wrongAnswers',
            JSON.stringify(wrongAnswers)
          );
        


        }
      }
      
      
      // else {

      //   skippedQuestions++;
      //   window.sessionStorage.setItem(
      //     'skippedQuestions',
      //     JSON.stringify(skippedQuestions)
      //   );
        
      // }
      
      
      // else {
      //   if (
      //     questionsArray[currentQuestionIndex].correct ===
      //     questionsArray[currentQuestionIndex].selected
      //   ) {
      //     document
      //       .getElementById(questionsArray[currentQuestionIndex].correct)
      //       .classList.add('right-answer');
      //   } else {
      //     document
      //       .getElementById(questionsArray[currentQuestionIndex].correct)
      //       .classList.add('right-answer');
      //     document
      //       .getElementById(questionsArray[currentQuestionIndex].selected)
      //       .classList.add('wrong-answer');
      //   }
      // }

    };

    answerElement.addEventListener('click', checkAnswer);
  }




  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener('click', nextQuestion);

  const hint = document.getElementById(HINT_QUIZ_BUTTON_ID);
  const initHint = () => {
    const hintDiv = createHintElement(
      currentQuestion.explanation,
      currentQuestion.links[0].text,
      currentQuestion.links[0].href
    );
    userInterface.appendChild(hintDiv);

    const hintHidden = () => {
      hintDiv.hidden = true;
    };
    

    document
      .getElementById(CLOSE_ELEMENT_ID)
      .addEventListener('click', hintHidden);
  };

  hint.addEventListener('click', initHint);

  const finish = document.getElementById(FINISH_QUIZ_BUTTON_ID);
  finish.style.left = '60%';

  finish.addEventListener('click', initFinishPage);



};

const nextQuestion = () => {
  const questionsArray = JSON.parse(
    window.sessionStorage.getItem('questionsArray')
  );

  let currentQuestionIndex = JSON.parse(
    window.sessionStorage.getItem('currentQuestionIndex')
  );


  let skippedQuestions = JSON.parse(
    window.sessionStorage.getItem('skippedQuestions')) || 0;




  // if (questionsArray[currentQuestionIndex].selected) {

  //   currentQuestionIndex++;


  // } else {
  //   skippedQuestions++
  //   currentQuestionIndex++;

  // }









  // window.sessionStorage.setItem(
  //   'currentQuestionIndex',
  //   JSON.stringify(currentQuestionIndex)
  // );





  




  currentQuestionIndex++;




  if (currentQuestionIndex <= questionsArray.length - 1) {

    if (questionsArray[currentQuestionIndex].selected === null) {
      console.log(questionsArray[currentQuestionIndex].selected)
      skippedQuestions++
      window.sessionStorage.setItem(
        'skippedQuestions',
        JSON.stringify(skippedQuestions)
      );
    }






    window.sessionStorage.setItem(
      'currentQuestionIndex',
      JSON.stringify(currentQuestionIndex)
    );

    initQuestionPage();
  } else {
    initFinishPage();
  }
};
