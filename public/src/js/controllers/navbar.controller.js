
angular.module('altizonApp').controller('NavBarCtrl', function ($scope, $state, LogoutService, $window, AuthenticationService) {

  $scope.logOutUser = function() {
            if (AuthenticationService.isAuthenticated) {

                LogoutService.logout().success(function(data) {
                    AuthenticationService.isAuthenticated = false;
                    delete $window.sessionStorage.token;
                    $state.go("login");
                }).error(function(status, data) {
                    console.log(status);
                    console.log(data);
                });
            }
            else {
                $state.go("login");
            }
        };
});
