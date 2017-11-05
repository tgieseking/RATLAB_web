ratlab.controller('SightingsMapController', ['$scope',
  function($scope) {
    var map;
    $scope.initMap =  function() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
    }
  }
])
