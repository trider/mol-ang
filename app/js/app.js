'use strict';

// Declare app level module which depends on filters, and services
var molApp = angular.module('molApp', [ 'ngRoute', 'molAppControllers', 'molAppServices']);

molApp.config(['$routeProvider',
  function ($routeProvider)
  {
  	$routeProvider.
        when('/rides', {
        	templateUrl: 'partials/rides-list.html',
        	controller: 'RideListCtrl'
        }).
        when('/about', {
        	templateUrl: 'partials/about.html',
        	controller: 'RideListCtrl'
        }).
        when('/donate', {
        	templateUrl: 'partials/donate.html',
        	controller: 'RideListCtrl'
        }).
								when('/maps/:ID', {
									templateUrl: 'partials/mapdata.html',
									controller: 'MapCtrl'
								});


  } ]);
