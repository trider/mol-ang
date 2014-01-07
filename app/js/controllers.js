var molAppControllers = angular.module('molAppControllers', ["leaflet-directive"]);

molAppControllers.controller('RideListCtrl', ['$scope', 'Routes', '$location', '$http', 'visible',
  function ($scope, Routes, $location, $http, visible)
  {

			
		 $scope.rides = ['Offroad', 'Onroad', 'Challange', 'Touring'];
			
			$scope.routes = Routes.query();
			visible.hide('#about, #back');
			
			$scope.show = function ()
  	{
					visible.show('#about, #back');
					visible.hide('#pic, #show, #hide, #accordion, #rides');
  	};

			$scope.hide = function ()
  	{
				 
					visible.show('#pic, #show, #accordion, #rides');
					visible.hide('#about, #back, #home');
					
  	};

			$scope.update = function()
			{
							if(angular.element('#rides').val()=="")
							{
									visible.show('#pic, #show');
							}
							else
							{
									visible.hide('#pic, #show, #about, #back');
							}
						
			}
  	

  	$scope.go = function (path)
  	{
  		$location.path(path);
  	};
  }]);


  molAppControllers.controller('MapCtrl', ['$scope', '$routeParams', '$route', '$location', 'Map', 'CurrTime', 'leafletData', 'visible', 'mapSize',
  function ($scope, $routeParams, $route, $location, Map, CurrTime, leafletData, visible, mapSize)
  {

  	$scope.timer;
  	$scope.mheight = mapSize.getMapSize();
  	$scope.count = 0;
  	visible.hide('.cnt, #hidedetails, #stop, #counter');
  	$scope.go = function (path)
  	{
  		$location.path(path);
  	};

  	$scope.show = function ()
  	{
  		visible.show('.cnt, #hidedetails');
  		visible.hide('#showdetails, .map, #home');
  	};

  	$scope.hide = function ()
  	{
  		visible.hide('.cnt, #hidedetails');
  		visible.show('#showdetails, .map, #home');
  	};

  	$scope.start = function ()
  	{
  		count = 0;
  		visible.hide('#start');
  		visible.show('#stop, #counter');
  		timer = jQuery.timer(function ()
  		{
  			count++;
  			angular.element('#counter').html('<b>Elapsed time:</b> ' + CurrTime.getTime(count));
  		});

  		timer.set({ time: 1000, autostart: true });
  	};

  	$scope.stop = function ()
  	{
  		timer.stop();
  		count = 0;
  		visible.hide('#stop, #counter');
  		visible.show('#start');
  	};

  	angular.extend($scope, {

  		defaults: {
  			tileLayer: "http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png",
  			scrollWheelZoom: false
  		},
  		markers: {},
  		paths: {}
  	});


  	$scope.ridedata = Map.get({ mapID: $routeParams.ID }, function (data)
  	{

  		leafletData.getMap().then(function (map)
  		{

  			L_PREFER_CANVAS = true;
  			L_DISABLE_3D = true;

  			L.control.locate({
  				position: 'topleft',
  				drawCircle: true,
  				strings: {
  					title: "Show me where I am",
  					popup: "You are within {distance} {unit} from this point",
  					outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
  				}
  			}).addTo(map);

  			var el = L.control.elevation({
  				position: "topright",
  				theme: "steelblue-theme",
  				width: 100,
  				height: 100,
  				margins: { top: 10, right: 10, bottom: 20, left: 10 },
  				useHeightIndicator: true,
  				interpolation: "linear",
  				hoverNumber: { decimalsX: 3, decimalsY: 0 },
  				xTicks: undefined,
  				yTicks: undefined
  			});

  			var g = new L.GPX(data.mapfile, { async: true });
  			g.on("addline", function (e)
  			{
  				el.addData(e.line);
  			});
  			g.addTo(map);
  			el.addTo(map);
  		});

  		angular.extend($scope, {

  			center: {
  				lat: data.lat,
  				lng: data.lng,
  				zoom: 10
  			}


  		});

  	});

  } ]);



