'use strict';

(function(){
  let addForwardArrow = function(){
    $('#forward_arrow').on('click', function(){
      $('#map').append(google.maps.SymbolPath.FORWARD_CLOSED_ARROW);
    }
  })
})()
