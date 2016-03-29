angular.module('altizonApp').config(function ($stateProvider) {
  $stateProvider.state('login', {
    url: '/',
    access: { requiredAuthentication: false },
    views: {
      'content@': {
        templateUrl: 'views/pages/login.html',
        controller: 'LoginCtrl'
      }
    }
  });
});
