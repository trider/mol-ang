var molAppServices = angular.module('molAppServices', ['ngResource']);
 
molAppServices.factory('Routes', ['$resource',
  function($resource){
				
				return $resource('data/routes.json', {}, {
						query: {method:'GET', params:{ID:'routes'}, isArray:true, cache: true}
    });
}]);


molAppServices.factory('Map', ['$resource',
  function($resource){
			
    return $resource('data/:mapID.json', {}, {
						query: {method:'GET', params:{mapID:'map'}, isArray:true, cache: true}
				});
}]);



