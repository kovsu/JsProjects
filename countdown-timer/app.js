const newYear = "1 Jan 2023";

const day = document.querySelector("#days");
const hour = document.querySelector("#hours");
const min = document.querySelector("#mins");
const second = document.querySelector("#seconds");

function countdown() {
  const newYearDate = new Date(newYear);
  const currentDate = new Date();

  const diff = (newYearDate - currentDate) / 1000;
  const days = Math.floor(diff / 3600 / 24);
  const hours = Math.floor(diff / 3600) % 24;
  const mins = Math.floor(diff / 60) % 60;
  const seconds = Math.floor(diff % 60);

  initial(days, hours, mins, seconds);
  // console.log(days, hours, mins, seconds);
}

function initial(days, hours, mins, seconds) {
  day.innerHTML = format(days);
  hour.innerHTML = format(hours);
  min.innerHTML = format(mins);
  second.innerHTML = format(seconds);
}

function format(time) {
  return time < 10 ? `0${time}` : time;
}

countdown();

setInterval(countdown, 1000);
