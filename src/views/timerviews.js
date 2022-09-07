import { TIMER_Id } from '../constants.js';

export const createTimerElement = () => {
  const timer = document.createElement('label');
  timer.id = TIMER_Id;

  const seconds = document.createElement('span');
  seconds.id = 'seconds';
  seconds.textContent = '00';
  timer.appendChild(seconds);

  const punctuationMark = document.createElement('span');
  punctuationMark.textContent = ':';
  timer.appendChild(punctuationMark);

  const minutes = document.createElement('span');
  minutes.id = 'minutes';
  minutes.textContent = '00';
  timer.appendChild(minutes);

  return timer;
};
