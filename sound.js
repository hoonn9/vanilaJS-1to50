const head = document.querySelector("head");

const createSound = (src, id) => {
  const audio = document.createElement("audio");
  audio.src = src;
  audio.id = id;
  head.appendChild(audio);
};

function init() {
  createSound("./sound/pong.mp3", "pong");
}

init();
