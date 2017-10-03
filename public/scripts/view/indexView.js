'use strict';

function indexView() {
  $('.indexPage').show()
  $('.indexPage').siblings().hide();

  $('#startButton').on('click', mapView);
}
