'use strict';

var markers = [], mapCenter, car, markerUrls = '', map, zoom;

const initMap = () => {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 47.608810, lng: -122.340021},
    zoom: 20,
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      map.setCenter(pos);
    },
    () => handleLocationError(true, map.getCenter()));
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, map.getCenter());
  }

  map.addListener('click', e => placeMarker(e.latLng, map));

  $('#carIcons img').on('click', event => {
    car = event.target.src;
    $('#carIcons img').css({border:'none', opacity: '0.6'});
    $(event.target).css({border:'thin black solid', opacity: '1'});
  })

  const placeMarker = (latLng, map) => {
    var marker = new google.maps.Marker({
      position: latLng,
      map: map,
      icon: car,
      animation: google.maps.Animation.DROP
    });
    markers.push({lat: latLng.lat().toFixed(6), lng: latLng.lng().toFixed(6), marker: marker, path: car});
  }
  $('#removeMarker').on('click', () => {
    markers[markers.length - 1].marker.setMap(null);
    markers.pop()
  })
}

const geocodeAddress = (event) => {
  event.preventDefault();
  var geocoder = new google.maps.Geocoder();
  let address = $('#formField').val()
  geocoder.geocode({'address': address}, (results,status) => {
    status === 'OK' ? map.setCenter(results[0].geometry.location) && $('#formField').val('') : alert('Geocoding was unsuccessful because of this: ' + status + '.');
  });
}

$('.geocodeAddressButton').on('submit', geocodeAddress);
$('#setAddress').on('click', geocodeAddress);

$('#saveMap').on('click', () => {
  mapCenter = {lat: map.getCenter().lat(), lng: map.getCenter().lng()}
  markerUrls = '';
  zoom = map.getZoom() - 1
  console.log(zoom)
  markers.forEach(marker => {
    markerUrls += '&markers=icon:' + marker.path + '|' + marker.lat + ',' + marker.lng;
    return markerUrls;
  })
  $('#mapPreview').attr('src', `https://maps.googleapis.com/maps/api/staticmap?center=${mapCenter.lat},${mapCenter.lng}&zoom=${zoom}&size=700x600${markerUrls}&key=AIzaSyD-PrvzwpOWXJ7A2TRqspmdyHQlA7F1_5k`)
  notesView();
})

$('#emailButton').on('click', () => {
  var mailOptions = {
    from: `"${$('#userName').val()}"<reportmywreck@gmail.com>`,
    to: `${$('#recipient').val()}`,
    subject: `${$('#subject').val()}`,
    html: `<p>${$('#emailBody').val()}</p><img src='https://maps.googleapis.com/maps/api/staticmap?center=${mapCenter.lat},${mapCenter.lng}&zoom=${map.getZoom()}&size=700x600${markerUrls}&key=AIzaSyD-PrvzwpOWXJ7A2TRqspmdyHQlA7F1_5k'>`
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
