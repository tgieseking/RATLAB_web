ratlab.factory('DatabaseService',
  ['$rootScope', '$location', '$firebaseArray',
  function($rootScope, $location, $firebaseArray) {
    var ref = firebase.database().ref();
    var databaseObject;

    databaseObject = {
      sightings: $firebaseArray(ref.child('sightings'))
      // sightings: ['a', 'b', 'c']
    };

    $rootScope.$on('logout', function () {
      databaseObject.sightings.$destroy();
    });

    $rootScope.$on('login', function () {
      databaseObject.sightings = $firebaseArray(ref.child('sightings'));
    });

    return databaseObject;
  }]);
