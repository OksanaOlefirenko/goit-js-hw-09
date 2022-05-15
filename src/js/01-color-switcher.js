const refs = {
    body: document.querySelector("body"),
    startBtn: document.querySelector("button[data-start]"),
    stopBtn: document.querySelector("button[data-stop]"),
}

let timerId = null;

const changeStatusBtn = (add, remove) => {
    refs.stopBtn.disabled = add;
    refs.startBtn.disabled = remove;
};

refs.startBtn.addEventListener("click", onStartBtnClick);
refs.stopBtn.addEventListener("click", onStopBtnClick);

changeStatusBtn(true, false);

function onStartBtnClick() {
    timerId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    // console.log(timerId);
    changeStatusBtn(false, true);
}

function onStopBtnClick() {
    clearInterval(timerId);
    changeStatusBtn(true, false);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}