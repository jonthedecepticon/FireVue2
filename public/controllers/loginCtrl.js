var app = angular.module('fireVue')

app.controller('loginCtrl', function($scope, $location, hirevueService) {

  $scope.login = function() {

    hirevueService.login($scope.email)
      .success(function() {  //.then(function(data) {
        console.log('Logged in successfully'); //console.log('Logged in', data);
        $scope.loginError = false;
        $location.path('/firevue');
      }).error(function(){
        console.log('Wrong');
        $scope.loginError = true;
        $location.path('/login')
      })
  } 
});