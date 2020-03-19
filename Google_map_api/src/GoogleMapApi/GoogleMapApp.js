// import Map from './GoogleAPI.js';


// document.addEventListener("DOMContentLoaded", function () {
//   let mapElement = document.getElementById('map');
//   const uluru = {
//     lat: 0,
//     lng: 0
//   };

//   navigator.geolocation.getCurrentPosition(position => {
//     uluru.lat = position.coords.latitude;
//     uluru.lng = position.coords.longitude;
//   });

//   Map.loadGoogleMapsApi().then(function (googleMaps) {
//     Map.createMap(googleMaps, mapElement, uluru);
//   });
// });



(function googleMap() {
  const async = document.querySelector('[data-name="async"]');
  async.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyB7Zkwv8ZHein66BAALTpWsJAQorKjiTlw";
  async.type = "text/javascript";
  async.onload = () => {
    const uluru = {};
    navigator.geolocation.getCurrentPosition(position => {
      uluru.lat = position.coords.latitude;
      uluru.lng = position.coords.longitude;
      const map = new google.maps.Map(
        document.getElementById('map'), {
          zoom: 4,
          center: uluru,
        }
      );
      const marker = new google.maps.Marker({
        position: uluru,
        map: map
      });
    })
  }

  console.dir(async)
})()
