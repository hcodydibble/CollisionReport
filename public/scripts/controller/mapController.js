'use strict';

var markers = [];
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 21,
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      map.setCenter(pos);
    }, function() {
      handleLocationError(true, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, map.getCenter());
  }

  map.addListener('click', function(e) {
    placeMarker(e.latLng, map);
  });

  function placeMarker(latLng, map) {
    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      animation: google.maps.Animation.DROP
    });
    markers.push({lat: latLng.lat().toFixed(6), long: latLng.lng().toFixed(6), marker: marker});
  }

  $('#removeMarker').on('click', function(){
    markers[markers.length - 1].marker.setMap(null);
    markers.pop()
  })
}
