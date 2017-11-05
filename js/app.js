var ratlab = angular.module('ratlab', ['ngRoute', 'firebase'])

ratlab.run(['$rootScope', '$location', function($rootScope, $location) {
  $rootScope.$on('$routeChangeError', function(event, next, previous, error) {
    if (error == 'AUTH_REQUIRED') {
      $rootScope.message = 'Sorry, you must log in to access that page';
      $location.path('/login');
    }
  });
}]);

ratlab.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'views/login.html',
      controller: 'RegistrationController'
    }).
    when('/register', {
      templateUrl: 'views/register.html',
      controller: 'RegistrationController'
    }).
    when('/sightingsList', {
      templateUrl: 'views/sightingsList.html',
      controller: 'SightingsListController',
      resolve: {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        }
      }
    }).when('/map', {
      templateUrl: 'views/sightingsMap.html',
      controller: 'SightingsMapController',
      resolve: {
        currentAuth: function(Authentication) {
          return Authentication.requireAuth();
        }
      }
    }).otherwise({
      redirectTo: '/login'
    })
}]);
