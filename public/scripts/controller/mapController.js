'use strict';

var markers = [];
var initialLocation;
var map;

$('#myLocationButton').on('click', myLocation);

function myLocation(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      map.setCenter(pos);
      initialLocation = pos;
    },
    function() {
      handleLocationError(true, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, map.getCenter());
  }
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 21,
  });

  map.addListener('click', function(e) {
    placeMarker(e.latLng, map);
  });

  $('#carIcons img').on('click', function(event){
    console.log(event.target.src)
  })
  function placeMarker(latLng, map) {
    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      icon: './img/270deg-black.png',
      animation: google.maps.Animation.DROP
    });
    markers.push({lat: latLng.lat().toFixed(6), lng: latLng.lng().toFixed(6), marker: marker});
  }
  $('#removeMarker').on('click', function(){
    markers[markers.length - 1].marker.setMap(null);
    markers.pop()
  })
}


$('#geocodeAddressButton').on('click', geocodeAddress);

function geocodeAddress(){
  var geocoder = new google.maps.Geocoder();
  // let address = $('formField').val()
  geocoder.geocode({'address': 'address'}, function(results,status){
    console.log(status)
    if(status === 'OK'){
      console.log(results)
      map.setCenter(results[0].geometry.location)
      initialLocation = {
        lat: results[0].geometry.location.lat().toFixed(6),
        lng: results[0].geometry.location.lng().toFixed(6)
      };
    }else{
      alert('Geocoding was unsuccessful because of this: ' + status + '.')
    }
  });
}
