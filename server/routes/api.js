var express = require('express'),
    router = express.Router(),
    request = require('request'),
    Client = require('node-rest-client').Client;
//router.post('/loginToAltizon')
var client = new Client();

router.post('/loginToAltizon', function(req, res, next) {

  var args = {
    data: {
      "email":req.body.userName,
      "password":req.body.password
    },
	   headers: { "Content-Type": "application/json" }
  };

  var loginReq = client.post("https://api.datonis.io/api_sign_in", args, function (data, response) {
	// parsed response body as js object
	//console.log(data);
	// raw response
	//console.log(response);
  if(data.auth_token !== undefined) {
    return res.json({token: data.auth_token});
  }else {
    return res.sendStatus(401);
  }
});

loginReq.on('requestTimeout', function (req) {
	console.log("request has expired");
	req.abort();

});

loginReq.on('responseTimeout', function (res) {
	console.log("response has expired");

});

loginReq.on('error', function (err) {
	console.log('something went wrong on request!!', err.request.options);
});

});

router.get('/thing/getAllThings', function(req, res, next) {


  request({
      uri: "https://api.datonis.io/api/v3/things",
      headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': req.headers.authorization
      }
  }, function(error, response, body) {
    return res.send(body);
      //var objectContainingAllThings = JSON.parse(body);
      //deferred.resolve(objectContainingAllThings);
  });

});

router.get('/thing/getThingDetails/:thingKey', function(req, res, next) {

  request({
      uri: "https://api.datonis.io/api/v3/things/"+req.params.thingKey,
      headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': req.headers.authorization
      }
  }, function(error, response, body) {
    return res.send(body);
      //var objectContainingAllThings = JSON.parse(body);
      //deferred.resolve(objectContainingAllThings);
  });

});

router.post('/thing/queryThingData', function(req, res, next) {

  var args = {
     data:  {
       "thing_key": req.body.thing_key,
       "from":req.body.from,
       "to":req.body.to,
       "time_zone":req.body.time_zone,
       "time_format":req.body.time_format,
       "per":req.body.per
     },
	   headers: {
       'Content-Type': 'application/json',
       'X-Auth-Token': req.headers.authorization
     }
  };

  console.log(req);
  var queryData = client.post("https://api.datonis.io/api/v3/datonis_query/thing_data", args, function (data, response) {
  // parsed response body as js object
  console.log(data);
  // raw response
  //console.log(response);
  return res.send(data);

});

queryData.on('requestTimeout', function (req) {
  console.log("request has expired");
  req.abort();

});

queryData.on('responseTimeout', function (res) {
  console.log("response has expired");

});

queryData.on('error', function (err) {
  console.log('something went wrong on request!!', err.request.options);
});
/*  request({
      uri: "https://api.datonis.io/api/v3/datonis_query/thing_data",
      headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': req.headers.authorization
      }
  }, function(error, response, body) {
    return res.send(body);
      //var objectContainingAllThings = JSON.parse(body);
      //deferred.resolve(objectContainingAllThings);
  });*/

});

router.get('/logoutFromAltizon', function(req, res, next) {

  console.log(req.headers);
  return res.sendStatus(200);
});



module.exports = router;
