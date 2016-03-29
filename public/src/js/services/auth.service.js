angular.module('altizonApp').factory('AuthenticationService', function() {
    var auth = {
        isAuthenticated: false,
        isAdmin: false
    };

    return auth;
});
