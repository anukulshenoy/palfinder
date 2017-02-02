//watch for current user location
angular.module('myApp').controller('watchCurrentUserLocation', function($window, $scope, databaseAndAuth) {
  //TODO: on sucesssful location update send it do the databse
  var success = function(response) {
    console.log('success! ', response.coords);
    $window.coordinates = response.coords;
  };
  var error = function(item) {
    console.log('error! ', item);
  }
  //params for watchPosition
  var options = {
    enableHighAccuracy: true,
    timeout: 1,
    maximumAge: Infinity
  };
  navigator.geolocation.watchPosition(success, error, options);
});