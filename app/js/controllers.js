var molAppControllers = angular.module('molAppControllers', ["leaflet-directive"]);

molAppControllers.controller('RideListCtrl', ['$scope', 'Routes', '$location', '$http',
  function ($scope, Routes, $location, $http)
  {

			
		 $scope.rides = ['Offroad', 'Onroad'];
			
			$scope.routes = Routes.query();
			angular.element('#about, #back, #list').hide();
			
			$scope.show = function ()
  	{
				 angular.element('#about, #back').show();
					angular.element('#pic, #show, #hide, #list, #rides').hide();
  	};

			$scope.hide = function ()
  	{
				 angular.element('#pic, #show, #list, #rides').show();
					angular.element('#about, #back, #home').hide();
  	};

			$scope.update = function()
			{
							if(angular.element('#rides').val()=="")
							{
									angular.element('#pic, #show').show();

							}
							else
							{
									angular.element('#pic, #show, #about, #back').hide();
							}
						
			}
  	

  	$scope.go = function (path)
  	{
  		$location.path(path);
  	};
  }]).directive('molAbout', function() {
    
				return {
						transclude: true,
      templateUrl: 'partials/about.html'
    };
  });


  molAppControllers.controller('MapCtrl', ['$scope', '$routeParams', '$route', '$location', '$http', 'Map',
  function ($scope, $routeParams, $route, $location, $http, Map)
  {

  	angular.element('.cnt, #hidedetails').hide();
			$scope.go = function (path)
  	{
  		$location.path(path);
  	};

			$scope.show = function ()
  	{
				 angular.element('.cnt, #hidedetails').show();
					angular.element('#showdetails, .map, #home').hide();
  	};

			$scope.hide = function ()
  	{
				 angular.element('.cnt, #hidedetails').hide();
					angular.element('#showdetails, .map, #home').show();
  	};


  	angular.extend($scope, {

  		defaults: {
  			tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png"
  		},
  		markers: {},
				paths:{}
  	});


  	$scope.ridedata = Map.get({ mapID: $routeParams.ID }, function (data)
  	{

  		angular.extend($scope, {

  			center: {
  				lat: data.lat,
  				lng: data.lng,
  				zoom: 10
  			},
  			markers:
  						{
  							m1: {
  								lat: data.startlat,
  								lng: data.startlng,
  								focus: true,
  								message: "Start",
  								draggable: false
  							},
									m2: {
  								lat: data.endlat,
  								lng: data.endlng,
  								focus: true,
  								message: "End",
  								draggable: false
  							}
  							//},
									//paths: {
									//    p1: {
									//        color: '#008000',
									//        weight: 8,
									//        latlngs: [
									//            { lat: 32.51995550285581, lng: 34.926939513672785 },
									//            { lat: 32.40341, lng: 34.867435 },
									//            { lat: 32.403293, lng: 34.867508 }
									//        ]
									//    }
        },
  		});

				$http.get(data.mapfile).success(function(data, status) {
        angular.extend($scope, {
            geojson: {
                data: data,
                style: {
                    fillColor: "blue",
                    weight: 5,
                    opacity: 1,
                    color: 'black',
                    fillOpacity: 1
                }
            }
        });
						});

  	});

		
  }]).directive('myDetails', function() {
    
				return {
      transclude: true,
      templateUrl: 'partials/pages/offroad/day1.html'
    };
  });


