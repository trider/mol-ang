'use strict';

/* Directives */
var molAppDirectives = angular.module('molAppDirectives', []);

molAppDirectives.directive('molAbout', [function() {
   return {
						transclude: true,
      templateUrl: 'partials/about.html'
    };
  }]);

molAppDirectives.directive('myDetails', function ()
  {

  	return {
  		transclude: true,
  		templateUrl: 'partials/pages/offroad/day1.html'
  	};
  })
