//describe('molApp controllers', function() {
//  beforeEach(module('molApp'));
// 
//  describe('RidesListCtrl', function(){
// 
// //   //it('should create "rides" model with 4 rides', inject(function($controller) {
//    //  var scope = {}, ctrl = $controller('RidesListCtrl', { $scope: scope });
//    //  expect(scope.rides.length).toBe(4);
//    //}));

//    //it('should create "days" model with 5', inject(function($controller) {
//    //  var scope = {}, ctrl = $controller('RidesListCtrl', { $scope: scope });
//    //  expect(scope.days.length).toBe(5);
//    //}));

//  });
//});

/* jasmine specs for controllers go here */
describe('molApp controllers', function() {

  describe('RidesListCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(module('molApp'));
    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('data/routes.json').
          respond([{type: 'Offroad'}, {name: 'Day 1'}]);

      scope = $rootScope.$new();
      ctrl = $controller('RidesListCtrl', {$scope: scope});

    }));
    
    //it('should create routes model with 1 routes fetched from xhr', function() {
    //  //expect(scope.routes).toBeUndefined();
    //  //$httpBackend.flush(); 
    //  //expect(scope.routes).toEqual([{type: 'Offroad'}, {name: 'Day 1'}]);
    //  expect(scope.routes.length).toBe(10);
    //});
    
     
  });


});