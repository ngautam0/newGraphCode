angular.module('altizonApp').factory('DashboardService', function ($http, $window) {
  return {

    getAllThings: function () {
      var req = {};
      req.url = '/user/thing/getAllThings';
      req.method = 'GET';
      return $http(req).success(function (response) {
        return response.data;
      });
    },

    getThingDetails: function (thingKey) {
      var req = {};
      req.url = '/user/thing/getThingDetails/'+thingKey;
      req.method = 'GET';
      return $http(req);
    },

    queryThingData: function (queryData) {
      var req = {};
      req.url = '/user/thing/queryThingData';
      req.method = 'POST';
      req.data = queryData;
      //req.params.data = data;
      return $http(req);
    }
  };
});
