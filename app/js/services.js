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


molAppServices.factory('Path', ['$resource',
  function($resource){
			
    return $resource('data/:mapID.json', {}, {
						query: {method:'GET', params:{mapID:'map'}, isArray:true, cache: true}
				});
}]);


molAppServices.factory('CurrTime',
	function ()
	{

		return {
			getTime: function (count)
			{
				var sec_num = parseInt(count, 10); // don't forget the second parm
				var hours = Math.floor(sec_num / 3600);
				var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
				var seconds = sec_num - (hours * 3600) - (minutes * 60);

				if (hours < 10) { hours = "0" + hours; }
				if (minutes < 10) { minutes = "0" + minutes; }
				if (seconds < 10) { seconds = "0" + seconds; }
				var time = hours + ':' + minutes + ':' + seconds;
				return time;

			}

		}

	});

molAppServices.factory('visible',
	function ()
	{

		return {
				hide: function (elms) {
						angular.element(elms).hide();
				},

				show: function (elms) {
						angular.element(elms).show();
				}
		}

	});

	molAppServices.factory('mapSize', ['$window',
	function ($window)
	{

		return {

			getMapSize: function ()
			{
				
				var res = $window.innerHeight;

				if(res <= 320){
							return '150px';
						}
						else if(res > 320 && res < 400){
							return '175px';
						} 
						else if(res >= 400 && res < 480 ){
							return '200px';
						}
						else if(res >= 480 && res < 540 ){
							return '300px';
						}
						else if(res > 540 ){
							return '400px';
						}	

				
			}

		}

	} ]);










