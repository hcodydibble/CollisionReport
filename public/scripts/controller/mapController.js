'use strict';

var markers = [];
var mapCenter;
var car;
var markerUrls = '';
var map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.608810, lng: -122.340021},
    zoom: 21,
  });

  map.addListener('click', function(e) {
    placeMarker(e.latLng, map);
  });

  $('#carIcons img').on('click', function(event){
    car = event.target.src;
    $('#carIcons img').css('border', 'none');
    $(event.target).css('border', 'thin blue solid');
  })
  function placeMarker(latLng, map) {
    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      icon: car,
      animation: google.maps.Animation.DROP
    });
    markers.push({lat: latLng.lat().toFixed(6), lng: latLng.lng().toFixed(6), marker: marker, path: car});
  }
  $('#removeMarker').on('click', function(){
    markers[markers.length - 1].marker.setMap(null);
    markers.pop()
  })
}

$('#myLocationButton').on('click', myLocation);

function myLocation(){
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      map.setCenter(pos);
    },
    function() {
      handleLocationError(true, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, map.getCenter());
  }
}

$('#geocodeAddressButton').on('click', geocodeAddress);

function geocodeAddress(){
  var geocoder = new google.maps.Geocoder();
  let address = $('#formField').val()
  geocoder.geocode({'address': address}, function(results,status){
    if(status === 'OK'){
      map.setCenter(results[0].geometry.location)
      $('#formField').val('');
    }else{
      alert('Geocoding was unsuccessful because of this: ' + status + '.')
    }
  });
}

$('#saveMap').on('click', function(){
  mapCenter = {lat: map.getCenter().lat(), lng: map.getCenter().lng()}
  markerUrls = '';
  markers.forEach(function(marker){
    markerUrls += '&markers=icon:' + marker.path + '|' + marker.lat + ',' + marker.lng;
    return markerUrls;
  })
  $('#testImage').attr('src', `https://maps.googleapis.com/maps/api/staticmap?center=${mapCenter.lat},${mapCenter.lng}&zoom=20&size=700x300${markerUrls}&key=AIzaSyD-PrvzwpOWXJ7A2TRqspmdyHQlA7F1_5k`)
  notesView();
})

$('#emailButton').on('click', function(){
  var mailOptions = {
    from: `"${$('#userName').val()}"<reportmywreck@gmail.com>`,
    to: `${$('#recipient').val()}`,
    subject: `${$('#subject').val()}`,
    html: `<p>${$('#emailBody').val()}</p><img src='https://maps.googleapis.com/maps/api/staticmap?center=${mapCenter.lat},${mapCenter.lng}&zoom=20&size=600x600${markerUrls}&key=AIzaSyD-PrvzwpOWXJ7A2TRqspmdyHQlA7F1_5k'>`
  }
  if($('#recipient').val() !== '' && $('#recipient').val().includes('@' && '.')){
    $.post('/mail', mailOptions)
    $('form')[0].reset();
    alert('Email sent!')
    window.location = '/'
  }else{
    alert('Please enter a recipient email.')
  }
})
