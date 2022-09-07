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

  const amount = questionsArray.length;
  const questionNumber = `Question [ ${currentQuestionIndex + 1} / ${amount} ]`;
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
        if (answerElement.id === questionsArray[currentQuestionIndex].correct) {
          console.log('rightAnswers');
          answerElement.classList.add('right-answer');
          saveSelectedAnswer(currentQuestionIndex, answerElement.id);

          questionsArray[currentQuestionIndex].selected = answerElement.id;

          quizData.rightAnswers++;
        } else {
          console.log('wrongAnswer');

          answerElement.classList.add('wrong-answer');
          saveSelectedAnswer(currentQuestionIndex, answerElement.id);
          document
            .getElementById(questionsArray[currentQuestionIndex].correct)
            .classList.add('right-answer');
          questionsArray[currentQuestionIndex].selected = answerElement.id;

          quizData.wrongAnswers++;
        }
      } else {
        if (
          questionsArray[currentQuestionIndex].correct ===
          questionsArray[currentQuestionIndex].selected
        ) {
          document
            .getElementById(questionsArray[currentQuestionIndex].correct)
            .classList.add('right-answer');
        } else {
          document
            .getElementById(questionsArray[currentQuestionIndex].correct)
            .classList.add('right-answer');
          document
            .getElementById(questionsArray[currentQuestionIndex].selected)
            .classList.add('wrong-answer');
        }
      }
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

  window.sessionStorage.setItem(
    'currentQuestionIndex',
    JSON.stringify(currentQuestionIndex + 1)
  );
  window.sessionStorage.setItem(
    'skippedQuestions',
    JSON.stringify(quizData.skippedQuestions)
  );
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
  const currentQuestionIndex = JSON.parse(
    window.sessionStorage.getItem('currentQuestionIndex')
  );
  const questionsArray = JSON.parse(
    window.sessionStorage.getItem('questionsArray')
  );
  const isLastQuestion = currentQuestionIndex === questionsArray.length - 1;

  if (!questionsArray[currentQuestionIndex].selected) {
    quizData.skippedQuestions++;
    window.sessionStorage.setItem(
      'currentQuestionIndex',
      JSON.stringify(currentQuestionIndex)
    );
    isLastQuestion ? initFinishPage() : initQuestionPage();
  } else {
    window.sessionStorage.setItem(
      'currentQuestionIndex',
      JSON.stringify(currentQuestionIndex)
    );

    isLastQuestion ? initFinishPage() : initQuestionPage();
  }
};
