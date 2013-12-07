var molAppControllers = angular.module('molAppControllers', []);

molAppControllers.controller('RideListCtrl', ['$scope', '$http', '$location',
  function ($scope, $http, $location)
  {

      $http.get('data/routes.json').success(function (data)
      {
          $scope.routes = data;
      });

      $scope.rides = ['Offroad', 'Onroad', 'Challenge', 'Touring'];
      $scope.days = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5'];

      $scope.go = function (path)
      {
          $location.path(path);
          
      };

      
  } ]);

molAppControllers.controller('MapCtrl', ['$scope', '$routeParams', '$http',
  function($scope, $routeParams, $http) {
    
    $scope.mapID = $routeParams.ID;
    $http.get('data/' + $routeParams.ID + '.json').success(function(data) {
      $scope.ridedata = data;
    });

  }]);






