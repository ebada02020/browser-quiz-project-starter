import { quizData } from '../data.js';
import { START_QUIZ_BUTTON_ID } from '../constants.js';
import { createFinishElement } from '../views/finishViews.js';
import { USER_INTERFACE_ID } from '../constants.js';
import { loadApp } from '../app.js';

export const initFinishPage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const finishElement = createFinishElement();
  userInterface.appendChild(finishElement);

  const resultMessage = document.getElementById('result-message');
  if (quizData.rightAnswers > 6) {
    resultMessage.textContent = 'Excellent, well done!';
    resultMessage.style.color = 'green';
  } else if (quizData.rightAnswers === 5) {
    resultMessage.textContent = 'Good, but you might do better';
    resultMessage.style.color = 'orange';
  } else {
    resultMessage.textContent = 'Give it another try';
    resultMessage.style.color = 'red';
  }

  document
    .getElementById(START_QUIZ_BUTTON_ID)
    .addEventListener('click', loadApp);

  window.sessionStorage.clear();
};
