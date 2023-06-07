let apiResults;

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
    });
}
