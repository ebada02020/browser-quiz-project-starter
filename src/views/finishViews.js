'use strict';

import { START_QUIZ_BUTTON_ID } from '../constants.js';
import { quizData } from '../data.js';

export const createFinishElement = () => {

  let wrongAnswers = JSON.parse(window.sessionStorage.getItem('wrongAnswers')) || 0;

  let rightAnswers = JSON.parse(window.sessionStorage.getItem('rightAnswers')) || 0;
  let skippedQuestions = JSON.parse(
    window.sessionStorage.getItem('skippedQuestions')) || 0;

  const element = document.createElement('div');
  element.style.width = '60rem';
  element.style.height = '40rem';
  element.style.position = 'relative';
  element.innerHTML = String.raw`
      <br>
      <h1>The result</h1>
      <hr>
      <br>
      <p class="result-paragraph" style="background: green;">Right answers: [ ${rightAnswers} ]</p>
      <br>
      <p class="result-paragraph" style="background: orange;">Skipped questions: [ ${skippedQuestions} ]</p>
      <br>
      <p class="result-paragraph" style="background: red;">Wrong answers: [ ${wrongAnswers} ]</p>
      <br>
      <h1 class="result-paragraph" style="background: blue;">Final result: [ ${rightAnswers} / ${quizData.questions.length} ]</h1>
      <br>
      <hr>
      <br>
      <h1 id="result-message">try</h1>
      <button id="${START_QUIZ_BUTTON_ID}">start again</button>`;

  return element;
};
