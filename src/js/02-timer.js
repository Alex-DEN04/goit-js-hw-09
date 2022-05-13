import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";

const refs = {
    startBtn: document.querySelector("[data-start]"),
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-minutes]"),
    seconds: document.querySelector("[data-seconds]"),
    timer: document.querySelector(".timer"),
}

refs.startBtn.addEventListener("click", onStartButtonClick);

refs.startBtn.disabled = true;

let startTime;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        startTime = selectedDates[0].getTime();
        if (startTime < Date.now()) {
            refs.startBtn.disabled = true;
            alert("Please choose a date in the future");
            return;
        } else {
            refs.startBtn.disabled = false;
        }
    },
};

flatpickr("#datetime-picker", options);

clockStyle()

function clockStyle() {
    refs.timer.style.display = "flex";

    const timerChildren = refs.timer.children;
    [...timerChildren].map(child => {
        child.style.display = "flex";
        child.style.justifyContent = "space-between";
        child.style.alignItems = "center";
        child.style.flexDirection = "column";
        child.style.padding = "0.5rem";
        child.firstElementChild.style.fontSize = "2rem";
        child.firstElementChild.style.fontWeight = "bold";
        child.lastElementChild.style.fontSize = "0.7rem";
        child.lastElementChild.style.textTransform = "uppercase";
    });
}

function onStartButtonClick() { 
    setInterval(() => {
        const currentTime = Date.now();
        const diference = startTime - currentTime;
        
        if (diference > 0) {
            const timeComponents = convertMs(diference);
            console.log(timeComponents);
            refs.days.textContent = timeComponents.days;
            refs.hours.textContent = timeComponents.hours;
            refs.minutes.textContent = timeComponents.minutes;
            refs.seconds.textContent = timeComponents.seconds;
        }
    }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
  // Remaining milliseconds
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}