angular.module('altizonApp').factory('LoginService', function ($http) {
  return {
    login: function (credentials) {
      //console.log('user name: '+credentials.userName);
      var req = {};
      req.url = '/user/loginToAltizon';
      req.data = credentials;
      req.method = 'POST';
      return $http(req);
    }
  };
});
