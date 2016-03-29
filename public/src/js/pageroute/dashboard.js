
angular.module('altizonApp').config(function ($stateProvider) {
  $stateProvider.state('dashboard', {
    parent: 'site',
    url: '/dashboard',
    access: { requiredAuthentication: true },
    views: {
      'content@': {
        templateUrl: 'views/pages/dashboard.html',
        controller: 'DashboardCtrl'
      }
    },
    resolve: {
      getThings: function(DashboardService) {
        return DashboardService.getAllThings().then(function (response) {
          return response.data;
        });
      }
    }
  });
});
