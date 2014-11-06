'use strict';

var app = angular.module('fireVue').factory('hirevueService', function($http, $q){
	return {
		login: function(user){
			return $http({
				method: 'POST',
				url: '/hirevueLogin',
				data: {
					email: user
				}
			});		
		},
		getMyData: function(){
			return $http({
				method: 'GET',
				url: '/firevue'
			}).then(function(res){
				console.log(res);
				return res.data
			})
		// },
		// uploadCsv: function(){
		// 	return $http({
		// 		method: 'GET',
		// 		url: '/firevue'
		// 	}).then(function(res){
		// 		console.log(res);
		// 		return res.data
		// 	})
		},
		logout: function(){
			return $http({
				method: 'POST',
				url: '/hirevueLogout'
			});
		}	
	}
});
