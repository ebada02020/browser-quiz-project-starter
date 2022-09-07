'use strict';

import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
  HINT_QUIZ_BUTTON_ID,
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';
import { SKIP_QUESTION_BUTTON_ID } from '../constants.js';
import { FINISH_QUIZ_BUTTON_ID } from '../constants.js';
import { timerIntervalId } from './timerPages.js';
import { initFinishPage } from './finishPage.js';
import { createHintElement } from '../views/hintElement.js';
import { saveSelectedAnswer } from './utilities.js';

export const initQuestionPage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const questionsArray = JSON.parse(
    window.sessionStorage.getItem('questionsArray')
  );
  const currentQuestionIndex = JSON.parse(window.sessionStorage.getItem('currentQuestionIndex'));
  const currentQuestion = questionsArray[currentQuestionIndex];

  const amount = questionsArray.length;
  const questionNumber = `Question [ ${
    currentQuestionIndex + 1
  } / ${amount} ]`;
  const score = `Score &nbsp&nbsp [ ${quizData.rightAnswers} / ${amount} ]`;
  const wrongAnswer = `&nbspWrong &nbsp [ ${quizData.wrongAnswers} / ${amount} ]`;
  const skipped = `Skipped [ ${quizData.skippedQuestions} / ${amount} ]`;

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
        if (
          answerElement.id ===
          questionsArray[currentQuestionIndex].correct
        ) {
          answerElement.style.background = 'green';

          questionsArray[currentQuestionIndex].selected =
            answerElement.id;


          saveSelectedAnswer(currentQuestionIndex, answerElement.id);

          quizData.rightAnswers++;
        } else {
          questionsArray[currentQuestionIndex].selected =
            answerElement.id;

            questionsArray[currentQuestionIndex].selected =
            answerElement.id;

          answerElement.style.background = 'red';
          document.getElementById(
            questionsArray[currentQuestionIndex].correct
          ).style.background = 'green';


          saveSelectedAnswer(currentQuestionIndex, answerElement.id);

          quizData.wrongAnswers++;
        }
      } else {
        if (questionsArray[currentQuestionIndex].correct === questionsArray[currentQuestionIndex].selected) {
          document.getElementById(questionsArray[currentQuestionIndex].correct).style.background = 'green';


        } else {
          document.getElementById(questionsArray[currentQuestionIndex].correct).style.background = 'green';

          document.getElementById(questionsArray[currentQuestionIndex].selected).style.background = 'red';

        }



      }
    };

    answerElement.addEventListener('click', checkAnswer);
  }

  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener('click', nextQuestion);

  const finish = document.getElementById(FINISH_QUIZ_BUTTON_ID);
  finish.style.left = '60%';

  finish.addEventListener('click', initFinishPage);

  window.sessionStorage.setItem(
    'currentQuestionIndex',
    JSON.stringify(quizData.currentQuestionIndex)
  );
  // window.sessionStorage.setItem(
  //   'skippedQuestions',
  //   JSON.stringify(quizData.skippedQuestions)
  // );
  window.sessionStorage.setItem(
    'wrongAnswers',
    JSON.stringify(quizData.wrongAnswers)
  );

  window.sessionStorage.setItem(
    'rightAnswers',
    JSON.stringify(quizData.rightAnswers)
  );
};

const nextQuestion = () => {

  const questionsArray = JSON.parse(
    window.sessionStorage.getItem('questionsArray')
  );
  let currentQuestionIndex = JSON.parse(window.sessionStorage.getItem('currentQuestionIndex'));

  const lastQuestion =
    currentQuestionIndex === questionsArray.length - 1;
  
  if (!questionsArray[currentQuestionIndex].selected) {

    window.sessionStorage.setItem('skippedQuestions', JSON.stringify(quizData.skippedQuestions++))

    window.sessionStorage.setItem('currentQuestionIndex', JSON.stringify(quizData.currentQuestionIndex++))

    window.sessionStorage.setItem('currentQuestionIndex', JSON.stringify(quizData.currentQuestionIndex++))


    lastQuestion ? initFinishPage() : initQuestionPage();
  } else {
    window.sessionStorage.setItem('currentQuestionIndex', JSON.stringify(quizData.currentQuestionIndex++))

    lastQuestion ? initFinishPage() : initQuestionPage();
  }
};
