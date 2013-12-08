var molAppControllers = angular.module('molAppControllers', ["leaflet-directive"]);

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

      angular.extend($scope, {
        
        tileLayer: 'http://{s}.tile.cloudmade.com/ba8af3a046054cefaed65ea8ca002dc1/101270/256/{z}/{x}/{y}.png";',
        
        center: {
            lat: data.lat,
            lng: data.lng,
            zoom: 12
            }
        });
    });
    
 }]);












