import API_KEY from "../env/env.js";
import arrayWeekDaysSorted from "./utility/timeGestionary.js";

let apiResults;

const loadingOverlay = document.querySelector(".loading-overlay");

//  const for curent weather

const weather = document.querySelector(".weather");
const temp = document.querySelector(".temp");
const location = document.querySelector(".location");

// const for curent weather hourly forecast predictions

const hourlyForecast = document.querySelectorAll(".hourly-forecast");
const hourlyTemp = document.querySelectorAll(".hourly-temp");

// const for daily forecast predictions

const dailyNames = document.querySelectorAll(".daily-name");
const dailyForecast = document.querySelectorAll(".daily-forecast");

// const for dinamic icone

const imgIcone = document.querySelector(".logo-weather");
let hour = new Date().getHours();

// geolocalisation

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      let long = position.coords.longitude;
      let lat = position.coords.latitude;

      APICall(long, lat);
    },
    (error) => {
      alert("Unable to get your location");
      console.error(error);
    }
  );
} else {
  alert("Geolocation is not supported by your browser");
}

// Api call

function APICall(long, lat) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&lang=fr&appid=${API_KEY}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      apiResults = data;

      //   current weather

      weather.innerText = apiResults.list[0].weather[0].main;
      temp.innerText = `${Math.round(apiResults.list[0].main.temp)}°C`;
      location.innerText = apiResults.city.name;

      // hourly predictions

      //    show hour

      for (let i = 0; i < hourlyForecast.length; i++) {
        let forecastHour1 = apiResults.list[i].dt_txt.split("")[11];
        let forecastHour2 = apiResults.list[i].dt_txt.split("")[12];
        hourlyForecast[i].innerText =
          Math.round(forecastHour1 + forecastHour2) + " h";
      }

      //    hourly predictions

      for (let j = 0; j < hourlyTemp.length; j++) {
        hourlyTemp[j].innerText =
          Math.round(apiResults.list[j].main.temp) + "°C";
      }

      // weekly forecast

      //    show the thirst 3 leters of the day

      for (let k = 0; k < 5; k++) {
        dailyNames[k].innerText = arrayWeekDaysSorted[k].slice(0, 3);
      }

      //    show the temperature of the day

      for (let l = 0; l < 5; l++) {
        if (l == 0) {
          dailyForecast[l].innerText =
            Math.round(apiResults.list[l + 8].main.temp) + "°C";
        } else {
          dailyForecast[l].innerText =
            Math.round(apiResults.list[l * 8].main.temp) + "°C";
        }
      }

      // dynamic icons

      if (hour >= 6 && hour < 21) {
        imgIcone.src = `../assets/day/${apiResults.list[0].weather[0].icon}.svg`;
      } else {
        imgIcone.src = `../assets/night/${apiResults.list[0].weather[0].icon}.svg`;
      }
    });

  loadingOverlay.classList.add("ease-out");
}
