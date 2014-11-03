'use strict';

var app = angular.module('fireVue', ['ngRoute']);

app.config(function($routeProvider, $httpProvider, $locationProvider){
	  $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
	$routeProvider.when('/login', {
		templateUrl: 'views/login.html',
		controller: 'loginCtrl'
	}).when('/firevue', {
		templateUrl: 'views/home.html',
		controller: 'searchCtrl'
	}).otherwise({
		redirectTo: '/login'
	})
});

