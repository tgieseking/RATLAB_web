ratlab.factory('DatabaseService',
  ['$rootScope', '$location', '$firebaseArray',
  function($rootScope, $location, $firebaseArray) {
    var ref = firebase.database().ref();
    var databaseObject;

    databaseObject = {
      sightings: $firebaseArray(ref.child('sightings'))
      // sightings: ['a', 'b', 'c']
    };

    return databaseObject;
  }]);
