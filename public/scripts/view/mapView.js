'use strict';

function mapView() {
  if ($('#map').is(':empty')) {initMap()}
  $('.mapPage').show().siblings().hide();
  $('#carIcons').toggle();
  $('#carSelect').on('click', () =>{
    $('#carIcons').toggle(500);
  })
}
