#Anuglar and Express to create a WebApp with Front and Back -end
###Created Angular.js page with <form> and on submit runs search() function
###Set up controller.js like this
```
var searchApp = angular.module('searchApp', []);

searchApp.controller('searchController', function($scope, $http){
	
	$scope.search = function(){
		$scope.message = 'Hello World';

		var apiUrl = "http://localhost:3000/search";

		$http.get(apiUrl, {"name" : "Will" }).success(function(result, status){
			$scope.status = status;
			$scope.result = "Congratulations! You connected to the server";
		});		
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
```
router.get('/search', function(req, res, next) {
	res.json({message: "Success"});
});
```
