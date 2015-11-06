var app = angular.module('myApp', ['ngRoute', 'ngResource']);

app.controller('shipsController', ['$scope', '$http', '$location', '$routeParams', 'getIdService', '$route', function($scope, $http, $location, $routeParams, getIdService, $route) {


  $scope.currentUrl = $route.current.templateUrl;
  console.log($scope.currentUrl);

  $scope.addUser = function() {
    var payload = {
      'name': $scope.username
    };
    $http.post('/users', payload).then(function(response) {
      console.log(response);
      $scope.username = '';
    });
    $scope.getUser();
  };

  $scope.addShip = function() {
    console.log(getIdService.id);
  };

  $scope.deleteShip = function(data) {
    console.log(data);
    $http.delete('/ships/' + data)
      .success(function(data) {
        $scope.userData = data;
      })
      .error(function(err) {});
    $scope.getUser();
  };

  $scope.getUser = function() {
    $http.get('/users')
      .success(function(data) {
        $scope.userData = data;
      })
      .error(function(err) {});
  };

  //Get Single UserId
  $scope.getSingleUserId = function(data) {
    getIdService.id = data._id;
    getIdService.username = data.name;
    console.log(data.name);
  };
  $scope.username = getIdService.username;

  //Get Single shipID
  $scope.getShipId = function(data) {
    getIdService.currentShipId = data._id;
    getIdService.placeHolderName = data.name;
    getIdService.placeHolderMissions = data.missions;
    console.log(getIdService.placeHolderName);
  };
  // populate input fields from user data
  $scope.shipName = getIdService.placeHolderName;
  $scope.shipMissions = getIdService.placeHolderMissions;
  //add ship to user
  $scope.upDateShip = function() {
    var id = getIdService.currentShipId;
    var payload = {
      'name': $scope.shipName,
      'missions': $scope.shipMissions
    };
    $http.put('/ships/' + id, payload).then(function(response) {
      console.log('success');
    });
  };


    $scope.editUser = function() {
    var id = getIdService.id;
    var payload = {
      'name': $scope.editUsername,
    };
    console.log(payload);
    console.log(id);
    $http.put('/users/' + id, payload).then(function(response) {
      console.log('success');
    });
  };

  //add ship to user
  $scope.addShip = function() {
    var id = getIdService.id;
    var payload = {
      'name': $scope.name,
      'missions': $scope.missions
    };
    $http.put('/users/' + id + '/ships', payload).then(function(response) {
      console.log('success');
    });
  };


}]);
