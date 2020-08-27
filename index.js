"use strict";

const bodyContent = document.querySelector(".body-content");
const timerElement = document.querySelector("#timer");

const startGame = () => {
  generateCard();

  startButton.style.visibility = "hidden";
  let time = 0;
  let min = 0;
  let sec = 0;
  let milisec = 0;
  timerElement.style.visibility = "visible";
  const timerInterval = setInterval(() => {
    time++;
    min = Math.floor(time / 6000);
    sec = Math.floor((time / 100) % 60);
    milisec = time % 100;
    timerElement.innerText = `${min}:${sec}:${milisec}`;
    if (isFinish) {
      startButton.style.visibility = "hidden";
      timerElement.style.visibility = "hidden";

      createResult(time);
      clearInterval(timerInterval);
    }
  }, 10);
};

function init() {
  bodyContent.style.height = `${window.innerHeight}px`;
  startButton.addEventListener("click", startGame);
}

init();
