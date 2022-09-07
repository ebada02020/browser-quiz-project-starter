'use strict';

import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
  HINT_QUIZ_BUTTON_ID
} from '../constants.js';
import { createQuestionElement } from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';
import { SKIP_QUESTION_BUTTON_ID } from '../constants.js';
import { FINISH_QUIZ_BUTTON_ID } from '../constants.js';
import { timerIntervalId } from './timerPages.js';
import { initFinishPage } from './finishPage.js';
import { createHintElement } from '../views/hintElement.js';


export const initQuestionPage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const questionsArray = JSON.parse(window.sessionStorage.getItem('questionsArray'));

  const currentQuestion = questionsArray[quizData.currentQuestionIndex];

  const amount = quizData.questions.length;
  const questionNumber = `Question [ ${quizData.currentQuestionIndex + 1} / ${amount} ]`;
  const score = `Score &nbsp&nbsp [ ${quizData.rightAnswers} / ${amount} ]`;
  const wrongAnswer = `&nbspWrong &nbsp [ ${quizData.wrongAnswers} / ${amount} ]`;
  const skipped = `Skipped [ ${quizData.skippedQuestions} / ${amount} ]`;

  const questionElement = createQuestionElement(currentQuestion.text, questionNumber, score, wrongAnswer, skipped);
  userInterface.appendChild(questionElement);

  const answersListElement = document.getElementById(ANSWERS_LIST_ID);

  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
    const answerElement = createAnswerElement(key, answerText);

    const correctAnswer = currentQuestion.correct;
    answersListElement.appendChild(answerElement);

    if (correctAnswer === key) {
      answerElement.id = 'right-answer';
    } else {
      answerElement.className = 'wrong-answer';
    }
  }

  const right = document.getElementById('right-answer');
  right.addEventListener('click', () => {
    if (currentQuestion.selected === null) {
      currentQuestion.selected = right;
      right.style.background = 'green';
      quizData.rightAnswers++;
      if (quizData.currentQuestionIndex === (questionsArray.length - 1)) {
        skipQuestion.hidden = true;
        hint.hidden = true;
        finish.style.left = '44.8%';
      }
    }
  });

  const wrong = document.getElementsByClassName('wrong-answer');
  for (let i = 0; i < wrong.length; i++) {
    wrong[i].addEventListener('click', () => {
      if (currentQuestion.selected === null) {
        currentQuestion.selected = wrong[i];
        wrong[i].style.background = 'red';
        setTimeout(() => { right.style.background = 'green'; }, 500);
        quizData.wrongAnswers++;
        if (quizData.currentQuestionIndex === (questionsArray.length - 1)) {
          skipQuestion.hidden = true;
          hint.hidden = true;
          finish.style.left = '44.8%';
        }
      }
    });
  }

  const toNextQuestion = document.getElementById(NEXT_QUESTION_BUTTON_ID);
  toNextQuestion.addEventListener('click', () => {
    if (currentQuestion.selected === right) {
      currentQuestion.selected = nextQuestion();
    } else if (currentQuestion.selected === wrong[0] || currentQuestion.selected === wrong[1] || currentQuestion.selected === wrong[2]) {
      currentQuestion.selected = nextQuestion();
    } else if (currentQuestion.selected === null) {
      currentQuestion.selected = setTimeout(() => {
        nextQuestion();
      }, 1000);
      right.style.background = 'green';
      quizData.skippedQuestions++;
    }
  });

  const hint = document.getElementById(HINT_QUIZ_BUTTON_ID);
  hint.addEventListener('click', () => {
    const hintDiv = createHintElement(currentQuestion.explanation, currentQuestion.links[0].text, currentQuestion.links[0].href);
    userInterface.appendChild(hintDiv);
    document.getElementById('close-element').addEventListener('click', () => {
      hintDiv.hidden = true;
    });
  });

  const skipQuestion = document.getElementById(SKIP_QUESTION_BUTTON_ID);
  skipQuestion.addEventListener('click', () => {
    if (quizData.currentQuestionIndex < (questionsArray.length - 1)) {
      if (currentQuestion.selected === right) {
        currentQuestion.selected = right;
      } else if (currentQuestion.selected === wrong[0] || currentQuestion.selected === wrong[1] || currentQuestion.selected === wrong[2]) {
        currentQuestion.selected = wrong[0];
      } else if (currentQuestion.selected === null) {
        currentQuestion.selected = setTimeout(() => {
          nextQuestion();
        }, 1000);
        right.style.background = 'green';
        quizData.skippedQuestions++;
      }
    } else {
      if (currentQuestion.selected === right) {
        currentQuestion.selected = right;
      } else if (currentQuestion.selected === wrong[0] || currentQuestion.selected === wrong[1] || currentQuestion.selected === wrong[2]) {
        currentQuestion.selected = wrong[0];
      } else if (currentQuestion.selected === null) {
        currentQuestion.selected = setTimeout(() => {
          initFinishPage();
        }, 1000);
        clearInterval(timerIntervalId);
        right.style.background = 'green';
        quizData.skippedQuestions++;
      }
    }
  });

  const finish = document.getElementById(FINISH_QUIZ_BUTTON_ID);
  if (quizData.currentQuestionIndex < (questionsArray.length - 1)) {
    finish.style.left = '87%';
  } else {
    toNextQuestion.hidden = true;
    finish.style.left = '26.7%';
  }

  finish.addEventListener('click', () => {
    if (currentQuestion.selected === right) {
      currentQuestion.selected = initFinishPage();
      clearInterval(timerIntervalId);
    } else if (currentQuestion.selected === wrong[0] || currentQuestion.selected === wrong[1] || currentQuestion.selected === wrong[2]) {
      currentQuestion.selected = initFinishPage();
      clearInterval(timerIntervalId);
    } else if (currentQuestion.selected === null) {
      currentQuestion.selected = setTimeout(() => {
        initFinishPage();
      }, 1000);
      clearInterval(timerIntervalId);
      right.style.background = 'green';
      quizData.skippedQuestions++;
    }
  });

  window.sessionStorage.setItem(
    'currentQuestionIndex',
    JSON.stringify(quizData.currentQuestionIndex)
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
}


const nextQuestion = () => {
  quizData.currentQuestionIndex++;

  initQuestionPage();
};
