ratlab.controller('SightingsMapController', ['$scope',
  function($scope) {
    var map;
    $scope.initMap =  function() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.730610, lng: -73.935242},
        zoom: 10
      });
    }
  }
])
