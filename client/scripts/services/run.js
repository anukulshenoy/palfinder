//initialzie watchers that trigger every time there is a change in our databse
angular.module('myApp').run(function(databaseAndAuth, $rootScope) {
  databaseAndAuth.database.ref('users').on('child_changed', function(snapshot) {
    //add the changed database item to our databaseAndAuth.users object
    //so it can be accessed accross all controllers 
    databaseAndAuth.users[snapshot.key] = snapshot.val();
    $rootScope.$broadcast('user:updatedOrAdded', [snapshot.key, snapshot.val()]);
    console.log('child changed', databaseAndAuth.users);
  });

  databaseAndAuth.database.ref('users').on('child_added', function(snapshot) {
    databaseAndAuth.users[snapshot.key] = snapshot.val();
    $rootScope.$broadcast('user:updatedOrAdded', [snapshot.key, snapshot.val()]);
    console.log('child added', databaseAndAuth.users);
  });

  databaseAndAuth.database.ref('users').on('child_removed', function(snapshot) {
    databaseAndAuth.users[snapshot.key] = snapshot.val();
    $rootScope.$broadcast('user:deleted', [snapshot.key, snapshot.val()]);
  });
});