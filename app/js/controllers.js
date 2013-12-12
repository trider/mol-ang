var molAppControllers = angular.module('molAppControllers', []);

molAppControllers.controller('RideListCtrl', ['$scope', 'Routes', '$location',
  function ($scope, Routes, $location)
  {

  	$scope.rides = ['Offroad', 'Onroad'];

  	$scope.update = function ()
  	{
  		$scope.routes = Routes.query();
  	};

  	$scope.go = function (path)
  	{
  		$location.path(path);
  	};
  } ]);

  molAppControllers.controller('MapCtrl', ['$scope', '$routeParams', '$route', '$location', 'Map',
  function ($scope, $routeParams, $route, $location, Map)
  {
  	$scope.ridedata = Map.get({ mapID: $routeParams.ID });
  	$scope.go = function (path)
  	{
  		$location.path(path);
  	};

  	$scope.refresh = function ()
  	{
  		$route.reload();
  	};

  } ]);