//watch for current user location
angular.module('myApp').controller('watchCurrentUserLocation', function($rootScope, $scope, databaseAndAuth) {
  //TODO: on sucesssful location update send it do the databse
  $scope.$on('user:id', function(event, data) {
    $scope.userId = data; 
  });

  var success = function(response) {
    console.log('success! ', response.coords);
    //$window.coordinates = response.coords;

    databaseAndAuth.database.ref('users/' + $scope.userId + '/coordinates').update({
        latitude: response.coords.latitude,
        longitude: response.coords.longitude
      });
    
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