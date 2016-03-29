
angular.module('altizonApp').controller('DashboardCtrl', function ($scope, DashboardService, getThings) {

  $scope.things = getThings.things;

  $scope.callApiForGettingData = function(thingKey){
    var queryData = {
       "thing_key": thingKey,
       "from":"2016/03/29 07:05:00",
       "to":"2016/03/29 17:10:00",
       "time_zone":"Mumbai" ,
       "time_format":"str",
       "per":"10"
     };
     $scope.isProcessing=true;

    DashboardService.queryThingData(queryData).success(function (data) {
      $scope.isProcessing=false;
      console.log(data);

      for (var tempVarForKeyRunOver in data) {
        if (data.hasOwnProperty(tempVarForKeyRunOver)) {
          console.log(data[tempVarForKeyRunOver]);
          if (data[tempVarForKeyRunOver].total_event_count !== undefined) {
            if (data[tempVarForKeyRunOver].total_event_count !== 0) {
              var flattenedData=flatTheRecievedData(data[tempVarForKeyRunOver].event_data);
              var parameters=flattenedData.pop();
              var graphData=flattenedData;
              console.log("Final Graph Data");
              console.log(graphData);
              $scope.message="I got some data.. Graph Plotting is required..";

              $scope.graphData = {
            dataset0: graphData
          };
          
          $scope.option1 = {
            series: [
              {
                axis: "y",
                dataset: "dataset0",
                key: "batt_lev",
                label: "Battery Level",
                color: "#1f77b4",
                type: ['line', 'dot', 'area'],
                id: 'mySeries0'
              }
            ],
            axes: {x: {key: "time", type: "date"}}
          };
            }
            else {
              $scope.message="No data exists for this thing...";

            }
          }
          else {
            $scope.message="Internal Server error Reported by Altizon";
          }
        }
      }

      function flatTheRecievedData(object){
        var objectSuitableForGraphPlot=[];
        console.log("in function");
        console.log(object);
        for (var counter = 0; counter < object.length; counter++) {
          var tempArrayToStoreData=[];
          var tempObjectToStoreData={};

          tempObjectToStoreData.time=new Date(object[counter].timestamp);
          for (var key in object[counter].data) {
            if (object[counter].data.hasOwnProperty(key)) {
              if (object[counter].data[key] !== true && object[counter].data[key] !== false ) {
                tempObjectToStoreData[key]=object[counter].data[key];
                if (tempArrayToStoreData.indexOf(key) <= -1) {
                  tempArrayToStoreData.push(key);
                }
              }
            }
          }
          objectSuitableForGraphPlot.push(tempObjectToStoreData);
        }

        console.log("object In function");
        objectSuitableForGraphPlot.push(tempArrayToStoreData);
        console.log(objectSuitableForGraphPlot);
        return objectSuitableForGraphPlot;
      }


    });
  };



});
