#Anuglar and Express to create a WebApp with Front and Back -end
###Created Angular.js page with <form> and on submit runs search() function
###Set up controller.js like this
```
var searchApp = angular.module('searchApp', []);

searchApp.controller('searchController', function($scope, $http) {

    $scope.search = function() {
        $scope.message = 'Hello World';

        var apiUrl = "http://localhost:3000/search";
        $http.post(apiUrl, {}).then(
            function successCallback(response) {
                $scope.result = response.data;
			// this callback will be called asynchronously
			// when the response is available
            }, function errorCallback(response) {
                $scope.result = "Error Mister Man...or woman!!";
			// called asynchronously if an error occurs
			// or server returns response with an error status.
            }
        );
    };
});
```
check https://docs.angularjs.org/api/ng/service/$http for documentation on Angular.js $HTTP requests
###In Express app.js - Enabled CORS
```
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
```
###In Express index.js - setup a route
####This will handle http requests
```
var express = require('express');
var router = express.Router();

router.post('/search', function(req, res, next) {
	res.json({message: "Success"});
});

module.exports = router;

```
