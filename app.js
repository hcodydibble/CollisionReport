'use strict';

var map, infoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 18
  });
  //only need the infoWindow if we want to display something over the map, like a message (see code above map.setCenter(pos))
  // infoWindow = new google.maps.InfoWindow;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      //navigator is an object created by Google
      //navigator.geolocation returns an object called Geolocation which has three functions (one of which is getCurrentPosition)
      //position is an object; coordinates is a key whose value is an array of lat, long, altitude, speed, accuracy, and heading
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      //the following commented code gives a pop up message at the retrieved coordinates that says 'location found'
      // infoWindow.setPosition(pos);
      // infoWindow.setContent('Location found.');
      // infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}
initMap();
