'use strict';
var app = angular.module('fireVue');

app.controller('searchCtrl', function($scope, $location, hirevueService){
	$scope.test = "Please enter a search";

	$scope.logout = function(){
		hirevueService.logout().then(function(){
			console.log('Successfully logged out');
			$location.path('/login');
		})
	}

	$scope.getMyData = function(){
		hirevueService.getMyData()
			.then(function(reponse){
			console.log(reponse);
		})
	}
	$scope.getMyData();


});