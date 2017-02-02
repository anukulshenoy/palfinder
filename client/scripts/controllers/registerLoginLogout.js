angular.module('myApp').controller('registerLogInLogOut', function($scope, databaseAndAuth) {
  $scope.register = function() {
    var register = databaseAndAuth.auth.createUserWithEmailAndPassword($scope.username, $scope.password);
    register.catch(function(error) {
      console.log(error.message);
    });
  };

  $scope.logIn = function() {
    var login = databaseAndAuth.auth.signInWithEmailAndPassword($scope.username, $scope.password);

    login.then(function() {
      $scope.username = '';
      $scope.password = '';
    });

    login.catch(function(error) {
      console.log(error.message);
      $scope.badLogin = error.message + ' If you don\'t have an account, please sign up!'
    })
  };

  $scope.logOut = function() {
    databaseAndAuth.auth.signOut();
  };

  //listen for authentication state change (user logged in or logged out)
  databaseAndAuth.auth.onAuthStateChanged(function(databaseUser) {
    if (databaseUser) {
      //show logout button on homepage
      $scope.loggedIn = true;
      $scope.$apply();
    } else {
      //hide logout button (user is not logged in)
      $scope.loggedIn = false;
      $scope.$apply();
    }
  });

});