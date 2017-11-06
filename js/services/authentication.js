ratlab.factory('Authentication',
  ['$rootScope', '$location', '$firebaseObject', '$firebaseAuth',
  function($rootScope, $location, $firebaseObject, $firebaseAuth) {
    var ref = firebase.database().ref();
    var auth = $firebaseAuth();
    var authenticationObject;

    auth.$onAuthStateChanged(function(authUser) {
      if(authUser) {
        var userRef = ref.child('users').child(authUser.uid);
        var userObj = $firebaseObject(userRef);
        $rootScope.currentUser = userObj;
      } else {
        $rootScope.currentUser = '';
      }
    })

    authenticationObject = {
      login: function(user) {
        auth.$signInWithEmailAndPassword(user.email, user.password
        ).then(function(user) {
          $location.path('/sightingsList');
          $rootScope.$broadcast('login');
        }).catch(function(error) {
          $rootScope.message = error.message;
        });
      },

      logout: function() {
        $rootScope.$broadcast('logout');
        auth.$signOut();
      },

      requireAuth: function() {
        return auth.$requireSignIn();
      },

      register: function(user) {
        auth.$createUserWithEmailAndPassword(user.email, user.password
        ).then(function(regUser) {
          var regRef = ref.child('users').child(regUser.uid).set({
            name: user.name,
            username: user.username,
            account_type: user.account_type
          });
          authenticationObject.login(user);
        }).catch(function(error) {
          $rootScope.message = error.message;
        });
      }
    };

    return authenticationObject;
  }]);
