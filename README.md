#Anuglar and Express to create a WebApp with Front and Back -end Connected with MongoDB
###Created Angular.js page with <form> and on submit runs search() function
###Set up controller.js like this
```js
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
```js
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
```
http://enable-cors.org/server_expressjs.html for documentation on Cross Origin Resource Sharing
###In Express index.js - setup a route
####This will handle http requests
```js
var express = require('express');
var router = express.Router();

router.post('/search', function(req, res, next) {
	res.json({message: "Success"});
});

module.exports = router;
```

#After setting this up We Ramped it up and Connected MongoDB
###Controller.js looks like this now
```js
var searchApp = angular.module('searchApp', []);

searchApp.controller('searchController', function($scope, $http){

    var apiUrl = 'http://localhost:3000/search';        
    $http({
           method: 'GET',
           url: apiUrl
       }).then(
        function successCallback(response) {
            $scope.studentsOnLoad = response.data;
            console.log($scope.studentsOnLoad);
            }, function errorCallback(response) {
                $scope.result = "ERROR!!!";
            });



    $scope.search = function(){
        var apiUrl = 'http://10.150.41.253:3000/search';        
        $http({
            method: 'POST',
            url: apiUrl,
            data: {name: $scope.who}
        }).then(
            function successCallback(response) {
                $scope.result = response.data;
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                $scope.result = "ERROR!!!";
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    };

})
```
###Configured Mondo DB into the Index.js folder like so
```js
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://localhost:27017/btb';

var db;
//Create a connection to mongo
MongoClient.connect(mongoUrl, function(error, database){
	db = database;
});

router.get('/search', function(req, res, next) {
	db.collection('students').find().toArray(function(error, studentResult){
		res.json(studentResult);
	});
});


router.post('/search', function(req, res, next) {
	console.log('Someone hit the server!!');
	//We get name from teh post request (in this case, from Angular)
	var individualStudent = req.body.name;
	db.collection('students').find({name: individualStudent}).toArray(function(error, studentResult){
		if(studentResult.length === 0){
			db.collection('students').insertOne({
				name: individualStudent
			});
			res.json("Sorry, there were no results. We have added " + individualStudent + " to the databtase");
		}else{
			res.json(studentResult[0].name + ' student');
		}
	});
});


module.exports = router;
```
###Updated HTML with Data
```html
	<body ng-controller="searchController">
	<li ng-repeat="name in studentsOnLoad">
		{{name.name}}
	</li>

	<div class="container">
		<div class="row">
			<form class="search-form" ng-submit="search()">
				<input type="text" ng-model="who">
				<input type="submit" class="btn btn-primary">
			</form>
		</div>
	</div>

	<div class="">{{who}}</div>
	<div class="">{{message}}</div>
	<div class="">{{result}}</div>
	<div class="">{{status}}</div>

	
	</body>
</html>
```

