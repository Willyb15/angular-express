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