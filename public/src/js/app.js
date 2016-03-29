angular.module('altizonApp', ['ui.router', 'ui.bootstrap', 'ngResource','n3-line-chart']).
config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

  //enable CSRF
  $httpProvider.defaults.xsrfCookieName = 'CSRF-TOKEN';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRF-TOKEN';

    $urlRouterProvider.otherwise('/');
  $stateProvider.state('site', {
    'abstract' : true,
    views: {
      'navbar@': {
        templateUrl: 'views/pages/navbar.html',
        controller: 'NavBarCtrl'
      },
      'footer@': {
        templateUrl: 'views/pages/footer.html'
      }
    }
  });

  $httpProvider.interceptors.push('TokenInterceptor');

}).run(function($rootScope, $state, $location, $window, AuthenticationService) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState) {
        //redirect only if both isAuthenticated is false and no token is set
        if (toState !== null && toState.access !== null && toState.access.requiredAuthentication && !AuthenticationService.isAuthenticated && $window.sessionStorage.token === undefined) {
            $location.path("/");
        }
    });
});
