ratlab.controller('SightingsMapController', ['$scope', 'DatabaseService',
  function($scope, DatabaseService) {
    var map;
    $scope.initMap =  function() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.730610, lng: -73.935242},
        zoom: 10
      });
      var sightingsList = DatabaseService.sightings;
      sightingsList.$loaded().then(function(){
        console.log(sightingsList.length);
        for (i = 0; i < sightingsList.length; i++) {
          var marker = new google.maps.Marker({
            position: {
              lat: sightingsList[i].latitude,
              lng: sightingsList[i].longitude
            },
            map: map
          });
        }
      });
    }
  }
])
