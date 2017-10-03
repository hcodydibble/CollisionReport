'use strict';
// var markers = [];
// var map;
// function initMap() {
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: -34.397, lng: 150.644},
//     zoom: 21,
//   });
//
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       var pos = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//       };
//
//       map.setCenter(pos);
//     }, function() {
//       handleLocationError(true, map.getCenter());
//     });
//   } else {
//     // Browser doesn't support Geolocation
//     handleLocationError(false, map.getCenter());
//   }
//
//   map.addListener('click', function(e) {
//     placeMarker(e.latLng, map);
//   });
//
//   function placeMarker(latLng, map) {
//     var marker = new google.maps.Marker({
//       position: latLng,
//       map: map
//     });
//     markers.push(marker);
//     //to access a specific marker's lat/long: markers[0].getPosition().lat() OR markers[0].getPosition().lng()
//     //this code (latLng.lat().toFixed(6) gets the latitude for wherever the user placed the marker to the six decimal place)
//     //remove marker at specific position with markers[0].setMap(null); will need to adjust array length b/c will remove marker from map NOT from marker array (use above code in conjunction w/ arr.pop to remove from map)
//     console.log(latLng.lat().toFixed(6));
//     console.log(latLng.lng().toFixed(6));
//   }
// }
