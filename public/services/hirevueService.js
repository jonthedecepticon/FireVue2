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
		// },
		// getMyData: function(){
		// 	var deferred = $q.defer();

		// 	$http({
		// 		method: 'GET',
		// 		url: 'https://app.devhv.com/api/v1/interviews/',
		// 		body: {
		//     "applicationToken": "test_public_token",
		//     "version": "1.2.0",
		//     "impersonate": req.body.email,
		//     "apiKey": ":"
		// },
		// json: true
		// 	}).success(function(response){
		// 		console.log(response);
		// 		deferred.resolve(response);
		// 	})
		// 	  .error(function(err){
		// 	  	deferred.reject(err);
		// 	  })
		// 	  return deferred.promise;
		},
		logout: function(){
			return $http({
				method: 'POST',
				url: '/hirevueLogout'
			});
		}	
	}
});
