"use strict";

const cardContainer = document.querySelector(".card-container");
const timerElement = document.querySelector("#timer");

const cardObjectArray = [];
let shuffledArray = [];
const to50array = [];
const firstTurn = [...Array(25).keys()];
const secondTurn = [];
let isFinish = false;

for (let i = 25; i < 50; i++) {
  secondTurn.push(i);
}

const shuffleArray = (array) => {
  for (let i = 0; i < array.length; i++) {
    const ranIdx = Math.floor(Math.random() * array.length);
    const temp = array[i];
    array[i] = array[ranIdx];
    array[ranIdx] = temp;
  }
  return array;
};

const generateCard = () => {
  for (let i = 0; i < 50; i++) {
    to50array.push(i);
  }
  shuffledArray = [...shuffleArray(firstTurn), ...shuffleArray(secondTurn)];

  console.log(shuffledArray);
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      cardObjectArray.push({
        x: i,
        y: j,
        num: shuffledArray.shift(),
      });
    }
  }

  cardObjectArray.forEach((element) => {
    createCard(element.num);
  });

  console.log(cardObjectArray);
};

const createCard = (num) => {
  const cardWrapper = document.createElement("div");
  cardWrapper.className = "card-wrapper";

  const cardElement = document.createElement("div");
  cardElement.className = "card-element";
  cardElement.innerText = `${num + 1}`;

  cardElement.addEventListener("click", () => {
    const clickCardNum = parseInt(cardElement.innerText) - 1;
    if (clickCardNum === to50array[0]) {
      cardElement.style.opacity = 0;
      if (shuffledArray.length > 0) {
        const newNum = shuffledArray.pop();

        setTimeout(() => {
          cardElement.style.opacity = 1;
          cardElement.innerText = `${newNum + 1}`;
        }, 800);

        console.log(parseInt(cardElement.innerText));
        const cardObjectIdx = cardObjectArray.findIndex(
          (e) => e.num === clickCardNum
        );
        cardObjectArray[cardObjectIdx].num = newNum;
      }
      to50array.shift();
      if (to50array.length === 0) {
        isFinish = true;
      }
    }
  });

  cardWrapper.appendChild(cardElement);
  cardContainer.appendChild(cardWrapper);
};

const init = () => {
  generateCard();

  let time = 0;
  let min = 0;
  let sec = 0;
  let milisec = 0;

  const timerInterval = setInterval(() => {
    time++;
    min = Math.floor(time / 6000);
    sec = Math.floor((time / 100) % 60);
    milisec = time % 100;
    timerElement.innerText = `${min}:${sec}:${milisec}`;
    if (isFinish) {
      clearInterval(timerInterval);
    }
  }, 10);
};

init();
