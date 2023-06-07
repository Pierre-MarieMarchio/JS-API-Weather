// require("dotenv").config({ path: "./env/.env" });

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
    console.log(long,lat);
};