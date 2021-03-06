ratlab.controller('SightingsMapController', ['$scope', 'DatabaseService', '$compile',
  function($scope, DatabaseService, $compile) {
    var map;
    var markersList = [];
    $scope.currentTab = 0;

    $scope.initMap =  function() {
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.730610, lng: -73.935242},
        zoom: 10
      });
      $scope.filterSightings();
    }

    $scope.submitSighting = function() {
      DatabaseService.sightings.$add($scope.newSighting);
      console.log("Submitted sighting")
      $scope.newSighting.address = '';
      $scope.newSighting.city = '';
      $scope.newSighting.state = '';
      $scope.newSighting.zipCode = '';
      $scope.newSighting.borough = 'UNKNOWN';
      $scope.newSighting.latitude = 0;
      $scope.newSighting.longitude = 0;
    }

    $scope.clearSightings = function() {
      for (i = 0; i < markersList.length; i++) {
        markersList[i].setMap(null);
      }
      markersList = [];
    }

    $scope.filterSightings = function() {
      $scope.clearSightings();
      var sightingsList = DatabaseService.sightings;
      sightingsList.$loaded().then(function(){
        for (i = 0; i < sightingsList.length; i++) {
          var sighting = sightingsList[i];
          var sightingDate = new Date(sighting.createdDate);
          if ((sighting.borough == "BROOKLYN" && $scope.filter.brooklyn ||
              sighting.borough == "BRONX" && $scope.filter.bronx ||
              sighting.borough == "MANHATTAN" && $scope.filter.manhattan ||
              sighting.borough == "STATEN_ISLAND" && $scope.filter.staten_island ||
              sighting.borough == "QUEENS" && $scope.filter.queens ||
              sighting.borough == "UNKNOWN" && $scope.filter.unknown) &&
              ($scope.filter.startDate == undefined || $scope.filter.startDate <= sightingDate) &&
              ($scope.filter.endDate == undefined || $scope.filter.endDate >= sightingDate)) {
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
                                  + sighting.zipCode + '<br>'
                                  + sighting.borough + '</p>';
                marker.infoWindow = new google.maps.InfoWindow({
                  content: infoContent
                });
                marker.addListener('click', function() {
                  this.infoWindow.open(map, this);
                });
                markersList.push(marker);
          }
        }
      });
    }
  }
])
