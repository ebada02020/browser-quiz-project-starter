export const shuffle = (array) => {
  let current = array.length;
  let temp;
  while (current > 0) {
    let random = Math.floor(Math.random() * current);
    current--;
    temp = array[current];
    array[current] = array[random];
    array[random] = temp;
  }

  return array;
};

export const saveSelectedAnswer = (index, answer) => {
  const questionsArray = JSON.parse(
    window.sessionStorage.getItem('questionsArray')
  );

  questionsArray[index].selected = answer;
  window.sessionStorage.setItem(
    'questionsArray',
    JSON.stringify(questionsArray)
  );
};
