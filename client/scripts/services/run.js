//initialzie watchers that trigger every time there is a change in our databse
angular.module('myApp').run(function(databaseAndAuth, $rootScope) {
  databaseAndAuth.userRef.on('child_changed', function(snapshot) {
    //console.log(snapshot.val());
    databaseAndAuth.users[snapshot.key] = snapshot.val();
    $rootScope.$broadcast('user:updatedOrAdded', [snapshot.key, snapshot.val()]);
  });

  databaseAndAuth.userRef.on('child_added', function(snapshot) {
    //console.log('CHILD ADDED ', snapshot.val());
    databaseAndAuth.users[snapshot.key] = snapshot.val();
    $rootScope.$broadcast('user:updatedOrAdded', [snapshot.key, snapshot.val()]);
  });

  databaseAndAuth.userRef.on('child_removed', function(snapshot) {
    databaseAndAuth.users[snapshot.key] = snapshot.val();
    $rootScope.$broadcast('user:deleted', [snapshot.key, snapshot.val()]);
  });
});