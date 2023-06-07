let apiResults;

//  const for curent weather

const weather = document.querySelector(".weather");
const temp = document.querySelector(".temp");
const location = document.querySelector(".location");

// const for curent weather hourly forecast predictions

const hourlyForecast = document.querySelectorAll(".hourly-forecast");
const hourlyTemp = document.querySelectorAll(".hourly-temp");

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position);
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

function APICall(long, lat) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&lang=fr&appid=${API_KEY}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      apiResults = data;
      console.log(apiResults);

      weather.innerText = apiResults.list[0].weather[0].main;
      temp.innerText = `${Math.round(apiResults.list[0].main.temp)}°C`;
      location.innerText = apiResults.city.name;

      //   hourly predictions

      for (let i = 0; i < hourlyForecast.length; i++) {
        let forecastHour1 = apiResults.list[i].dt_txt.split("")[11];
        let forecastHour2 = apiResults.list[i].dt_txt.split("")[12];
        hourlyForecast[i].innerText =
          Math.round(forecastHour1 + forecastHour2) + " h";
      }

      for (let j = 0; j < hourlyTemp.length; j++) {
        hourlyTemp[j].innerText =
          Math.round(apiResults.list[j].main.temp) + "°C";
      }
    });
}
