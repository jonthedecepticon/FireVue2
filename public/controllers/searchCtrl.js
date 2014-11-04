'use strict';
var app = angular.module('fireVue');

app.controller('searchCtrl', function($scope, $location, hirevueService){
	$scope.test = "Please upload a CSV* to preform a search";

	$scope.logout = function(){
		hirevueService.logout().then(function(){
			console.log('Successfully logged out');
			$location.path('/login');
		})
	}

	$scope.showExample = function(){
		$scope.showExample = false;
	};

	$scope.getMyData = function(){
		hirevueService.getMyData()
			.then(function(response){
			console.log(response);
			$scope.data = response;
		})
	}
	$scope.getMyData();


});