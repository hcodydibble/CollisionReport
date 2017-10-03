'use strict';

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

        // var myCar = new google.maps.Circle({
        //   strokeColor: 'blue',
        //   strokeOpacity: 0.8,
        //   strokeWeight: 2,
        //   fillColor: 'blue',
        //   fillOpacity: 0.5,
        //   map: map,
        //   center: {lat: position.coords.latitude, lng: position.coords.longitude},
        //   radius: 1,
        //   draggable: true
        // });
        // var otherCar = new google.maps.Circle({
        //   strokeColor: 'red',
        //   strokeOpacity: 0.8,
        //   strokeWeight: 2,
        //   fillColor: 'red',
        //   fillOpacity: 0.5,
        //   map: map,
        //   center: {lat: position.coords.latitude, lng: position.coords.longitude + 0.00003},
        //   radius: 1,
        //   draggable: true
        // });
        // var arrow = new google.maps.Marker({
        //   center: {lat: position.coords.latitude, lng: position.coords.longitude + 0.00003},
        //   map: map,
        //   path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
        // })

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
      map: map
    });
    //this code (latLng.lat().toFixed(3) gets the latitude for wherever the user placed the marker)
    console.log(latLng.lat().toFixed(6));
    console.log(latLng.lng().toFixed(6));
  }
}
