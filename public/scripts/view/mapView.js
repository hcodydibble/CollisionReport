'use strict';

function mapView() {
  $('.mapPage').show().siblings().hide();
  $('#carIcons').toggle();
  $('#carSelect').on('click', () =>{
    $('#carIcons').toggle(500);
  })
}
