const refs = {
    body: document.querySelector('body'),
    startButton: document.querySelector("[data-start]"),
    stopButton: document.querySelector("[data-stop]"),
}

let timerId = null;

refs.startButton.addEventListener("click", onStartButtonClick);
refs.stopButton.addEventListener("click", onStopButtonClick)
 
function onStartButtonClick() {
    timerId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
    }, 1000);

    refs.startButton.disabled = true;
    refs.stopButton.disabled = false;
}

function onStopButtonClick() {
    clearInterval(timerId);
    refs.stopButton.disabled = true;
    refs.startButton.disabled = false;
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}