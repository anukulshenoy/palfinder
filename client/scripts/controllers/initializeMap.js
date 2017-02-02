angular.module('myApp').controller('initializeMap', function($scope, databaseAndAuth, NgMap) {
  //set scope to userinfo provided by databaseAndAuth
  $scope.userLocations = databaseAndAuth.users;
  //listen for any changes in user location (executed in app.run above)
  $scope.$on('user:updatedOrAdded', function(event, data) {
    //apply the change only to the user that was updated/added/removed
    $scope.userLocations[data[0]] = data[1];
    console.log('user added or updated', $scope.userLocations);
    //apply the change so map markers can be updated
    $scope.$apply();
  });

  //on logout remove all map markers
  $scope.$on('user:loggedOut', function(event, data) {
    $scope.userLocations = undefined; 
    $scope.$apply();
  });

  // $scope.$on('user:deleted', function(event, data) {
  //   console.log('user removed');
  //   //delete the scope data for user that was removed from the database
  //   delete $scope.userLocations[data[0]];
  //   //apply the change so corresponding map marker can be removed
  //   $scope.$apply();
  // });

  NgMap.getMap().then(function(map) {
  });

});