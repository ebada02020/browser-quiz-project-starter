'use strict';

import { quizData } from './data.js';
import { initWelcomePage } from './pages/welcomePage.js';
import { createTimerElement } from './views/timerViews.js';
import { initQuestionPage } from './pages/questionPage.js';
import { setTime } from './pages/timerPages.js';
import { shuffle } from './pages/utilities.js';

const body = document.body;
export const time = createTimerElement();
time.style.position = 'absolute';
time.style.top = '6%';
time.style.left = '49.3%';
body.appendChild(time);

export const loadApp = () => {
  const isCurrentQuestionIndex = window.sessionStorage.getItem(
    'currentQuestionIndex'
  );

  const currentQuestionIndex = JSON.parse(isCurrentQuestionIndex) || 0;

  const skippedQuestions = window.sessionStorage.getItem('skippedQuestions');
  quizData.skippedQuestions = JSON.parse(skippedQuestions) || 0;

  const wrongAnswers = window.sessionStorage.getItem('wrongAnswers');
  quizData.wrongAnswers = JSON.parse(wrongAnswers) || 0;

  const rightAnswers = window.sessionStorage.getItem('rightAnswers');
  quizData.rightAnswers = JSON.parse(rightAnswers) || 0;

  const totalSeconds = window.sessionStorage.getItem('totalSeconds');
  quizData.totalSeconds = JSON.parse(totalSeconds) || 0;

  if (isCurrentQuestionIndex) {
    initQuestionPage();
    setTime(true);
  } else {
    const questionsArrayShuffled = shuffle(quizData.questions);
    window.sessionStorage.setItem(
      'questionsArray',
      JSON.stringify(questionsArrayShuffled)
    );

    window.sessionStorage.setItem(
      'currentQuestionIndex',
      JSON.stringify(currentQuestionIndex)
    );

    initWelcomePage();
    time.hidden = true;
  }
};

window.addEventListener('load', loadApp);
