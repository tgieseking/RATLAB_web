ratlab.controller('SightingsListController', ['$scope', 'DatabaseService',
  function($scope, DatabaseService) {
    $scope.sightingsList = DatabaseService.sightings;
}])
