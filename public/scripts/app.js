'use strict';

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 20,
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

        var circle = new google.maps.Circle({
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map: map,
          center: {lat: position.coords.latitude, lng: position.coords.longitude},
          radius: 2,
          draggable: true
        });

      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}
