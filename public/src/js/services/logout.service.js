angular.module('altizonApp').factory('LogoutService', function ($http) {
  return {
    logout: function () {
      var req = {};
      req.url = '/user/logoutFromAltizon';
      req.method = 'GET';
      return $http(req);
    }
  };
});
