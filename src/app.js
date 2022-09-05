'use strict';
import { quizData } from './data.js';
import { initWelcomePage } from './pages/welcomePage.js';
import { createTimerElement } from './views/timerViews.js';
import { initQuestionPage } from './pages/questionPage.js';
import { setTime } from './views/timerViews.js';
import { shuffle } from './pages/utilities.js';

const body = document.body;
export const time = createTimerElement();
time.style.position = 'absolute';
time.style.top = '6%';
time.style.left = '49.3%';
body.appendChild(time);

export const loadApp = () => {
  let currentQuestionIndex = window.sessionStorage.getItem(
    'currentQuestionIndex'
  );
  quizData.currentQuestionIndex = JSON.parse(currentQuestionIndex) || 0;

  let skippedQuestions = window.sessionStorage.getItem('skippedQuestions');
  quizData.skippedQuestions = JSON.parse(skippedQuestions) || 0;

  let wrongAnswers = window.sessionStorage.getItem('wrongAnswers');
  quizData.wrongAnswers = JSON.parse(wrongAnswers) || 0;

  let rightAnswers = window.sessionStorage.getItem('rightAnswers');
  quizData.rightAnswers = JSON.parse(rightAnswers) || 0;

  let totalSeconds = window.sessionStorage.getItem('totalSeconds');
  quizData.totalSeconds = JSON.parse(totalSeconds) || 0;

  if (currentQuestionIndex) {
    initQuestionPage();
    setTime(true);
  } else {
    const questionsArrayShuffled = shuffle(quizData.questions);
    window.sessionStorage.setItem(
      'questionsArray',
      JSON.stringify(questionsArrayShuffled)
    );
    initWelcomePage();
    time.hidden = true;
  }
};

window.addEventListener('load', loadApp);
