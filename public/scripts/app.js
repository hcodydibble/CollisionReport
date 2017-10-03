'use strict';

//this takes the users input of address and turns it into lat,long
var lati = 47.5739918;
var long = -122.41761162;

var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: lati, lng: long},
    zoom: 21,
  });

  // if (navigator.geolocation) {
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     var pos = {
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude
  //     };
  //
  //     map.setCenter(pos);
  //   }, function() {
  //     handleLocationError(true, map.getCenter());
  //   });
  // } else {
  //   // Browser doesn't support Geolocation
  //   handleLocationError(false, map.getCenter());
  // }

  map.addListener('click', function(e) {
    placeMarker(e.latLng, map);
  });

  function placeMarker(latLng, map) {
    var marker = new google.maps.Marker({
      position: latLng,
      map: map
    });
    //this code (latLng.lat().toFixed(3) gets the latitude for wherever the user placed the marker)
    console.log(latLng.lat().toFixed(6));
    console.log(latLng.lng().toFixed(6));
  }
}
