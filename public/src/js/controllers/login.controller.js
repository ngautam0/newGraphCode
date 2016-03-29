angular.module('altizonApp').controller('LoginCtrl', function ($scope, LoginService, $window, $state, AuthenticationService) {

  $scope.login = {
    userName: '',
    password: ''
  };

  //$scope.loginAlert = false;
  $scope.showLoginFailed = false;
  $scope.isProcessing = false;
  $scope.loginUser = function () {
    $scope.isProcessing = true;
    if (!$scope.login.userName || $scope.login.userName === ''|| !$scope.login.password || $scope.login.password === '' ) {
      $scope.isProcessing = false;
        return;
      }
    LoginService.login($scope.login).success(function(data) {
      console.log(data);
                    AuthenticationService.isAuthenticated = true;
                    $window.sessionStorage.token = data.token;
                    $state.go("dashboard");
                }).error(function(status, data) {
                  $scope.isProcessing = false;
                  $scope.showLoginFailed = true;
                    console.log(status);
                    console.log(data);
                });
  };
});
