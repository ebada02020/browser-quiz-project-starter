import { quizData } from '../data.js';

export let timerIntervalId = 0;

export function resetTotalSeconds() {
  quizData.totalSeconds = 0;
}

function increaseTimer() {
  quizData.totalSeconds++;
  window.sessionStorage.setItem(
    'totalSeconds',
    JSON.stringify(quizData.totalSeconds)
  );
  let minutes = document.getElementById('minutes');
  minutes.innerHTML = pad(quizData.totalSeconds % 60);
  let seconds = document.getElementById('seconds');
  seconds.innerHTML = pad(parseInt(quizData.totalSeconds / 60));
}

function pad(val) {
  let valString = val + '';
  if (valString.length < 2) {
    return '0' + valString;
  } else {
    return valString;
  }
}

export function setTime(start) {
  if (start) {
    timerIntervalId = setInterval(increaseTimer, 1000);
  }
}
