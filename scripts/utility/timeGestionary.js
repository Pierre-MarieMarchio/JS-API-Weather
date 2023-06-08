const arrayWeekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

let day = new Date();
let options = { weekday: "long" };
let today = day.toLocaleDateString("en-EN", options);

today = today.charAt(0).toUpperCase() + today.slice(1);

let arrayWeekDaysSorted = arrayWeekDays
  .slice(arrayWeekDays.indexOf(today))
  .concat(arrayWeekDays.slice(0, arrayWeekDays.indexOf(today)));

export default arrayWeekDaysSorted;
