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
        for (i = 0; i < sightingsList.length; i++) {
          var sighting = sightingsList[i];
          var marker = new google.maps.Marker({
            position: {
              lat: sighting.latitude,
              lng: sighting.longitude
            },
            map: map
          });
          var infoContent = '<h3>' + sighting.$id + '</h3>'
                            + '<p>' + sighting.address + '<br>'
                            + sighting.city + ', ' + sighting.state + ' '
                            + sighting.zipCode + '</p>';
          marker.infoWindow = new google.maps.InfoWindow({
            content: infoContent
          });
          marker.addListener('click', function() {
            this.infoWindow.open(map, this);
          });
        }
      });
    }
  }
])
