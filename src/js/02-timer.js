import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const refs = {
    btn: document.querySelector("button[data-start]"),
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-minutes]"),
    seconds: document.querySelector("[data-seconds]"),
}

let selectedUserDate;

refs.btn.disabled = true;

refs.btn.addEventListener("click", timerOn);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    //   console.log(selectedDates[0]);
      selectedUserDate = selectedDates[0];
      if (selectedUserDate < (new Date())) {
          Notiflix.Notify.failure("Please choose a date in the future");
        } else {refs.btn.disabled = false}
    },
};

flatpickr("input#datetime-picker", options);

      
function timerOn () {
    setInterval(() => {
        const deltaTime = selectedUserDate - Date.now();
        if (deltaTime >= 0) {
            const time = convertMs(deltaTime);
            refs.days.textContent = addLeadingZero(time.days);
            refs.hours.textContent = addLeadingZero(time.hours);
            refs.minutes.textContent = addLeadingZero(time.minutes);
            refs.seconds.textContent = addLeadingZero(time.seconds);
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
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0")
}