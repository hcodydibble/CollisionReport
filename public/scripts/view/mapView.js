'use strict';

function mapView() {
  $('.mapPage').show().siblings().hide();

  $('#carSelect').on('click', () =>{
    $('#carIcons').toggle(400);
  })
}
