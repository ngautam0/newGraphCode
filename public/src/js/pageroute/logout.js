angular.module('altizonApp').config(function ($stateProvider) {
  $stateProvider.state('logout', {
    parent: 'site',
    url: '/logout',
    access: { requiredAuthentication: true },
    views: {
      'content@': {
        templateUrl: 'views/pages/logout.html',
        controller: 'LogoutCtrl'
      }
    }
  });
});
