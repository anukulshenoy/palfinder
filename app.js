var app = angular.module('myApp', [
'ngRoute', 'firebase', 'ngGeolocation', 'ngMap'
]);

app.config(function ($routeProvider, $httpProvider) {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAhV8qputTImKp3Z5DwwpUmT8lyNRktCfc",
        authDomain: "palfinder-6d55f.firebaseapp.com",
        databaseURL: "https://palfinder-6d55f.firebaseio.com",
        storageBucket: "palfinder-6d55f.appspot.com",
        messagingSenderId: "673459070337"
    };
    firebase.initializeApp(config);
});

app.factory('databaseAndAuth', function($window, $geolocation, NgMap, $firebaseArray){
    var factory = {};
    factory.auth = firebase.auth();
    factory.database = firebase.database();
    factory.userRef = factory.database.ref('users');
    return factory;
});

app.controller('registerLogInLogOut', function($scope, databaseAndAuth){
    $scope.register = function (){
        var register = databaseAndAuth.auth.createUserWithEmailAndPassword($scope.username, $scope.password);
        register.catch(function(error) {
            console.log(error.message);
        })
    };
    $scope.logIn = function (){
        var login = databaseAndAuth.auth.signInWithEmailAndPassword($scope.username, $scope.password);
        login.catch(function(error) {
            console.log(error.message);
            $scope.badLogin = error.message + ' If you don\'t have an account, please sign up!'
        })
    };
    $scope.logOut = function (){
        databaseAndAuth.auth.signOut();
    };

    databaseAndAuth.auth.onAuthStateChanged(function(databaseUser) {
        if (databaseUser) {
            console.log(databaseUser.email);
            $scope.$apply(function() {
                $scope.loggedIn = true;
            });
        } else {
            console.log('not logged in');
            $scope.$apply(function() {
                $scope.loggedIn = false;
            });

        }
    });
});

// app.controller('logoutCurrentUser', function($scope, databaseAndAuth){
//     $scope.register = function (){
//         Auth.createUserWithEmailAndPassword($scope.username, $scope.password).then(function (user){
//             console.log('success', user);
//         }, function (error){
//             authCtrl.error = error;
//         });
//     };
// });

// app.controller('populateMapFromDb', function($scope, databaseAndAuth){
//     var database = firebase.database();
//     var userRef = database.ref('users');
//     $scope.positions = [];

//     //get the coordinates data from the database to populate the map
//     databaseAndAuth.userRef.on("child_added", function(snapshot, prevChildKey) {
//         var position = snapshot.val();
//         $scope.positions.push({userId: position.userId, latitude: position.coordinates.latitude, longitude: position.coordinates.longitude});
//         console.log($scope.positions);
//     });
// });

// app.controller('updateUser', function($scope, databaseAndAuth){
//     userRef.on("child_changed", function(snapshot) {
//         var position = (snapshot.val());
//         for (var i = 0; i < $scope.positions.length; i ++) {
//           if ($scope.positions[i].userId = $scope.user.userId) {
//             $scope.positions[i].latitude = position.coordinates.latitude;
//             $scope.positions[i].longitude = position.coordinates.longitude;
//             console.log($scope.positions[i]);
//           }
//         }
//     });
// });


// app.controller('logInExistingUser', function($scope, databaseAndAuth){
//     $scope.logIn = function () {
//         databaseAndAuth.auth.$signInWithEmailAndPassword($scope.existingUser, $scope.existingUserPassword).then(function (user){
//             console.log('success', user);
//             $scope.user = {
//                 userId : user.uid
//             }
//         }, function (error){
//             authCtrl.error = error;
//             console.log(error);
//         })
//         //grab the users current location
//         //populate the map
//     }
// });
       
// app.controller('manuallyAddCoordinates', function($scope, databaseAndAuth){
//     $scope.coordinates = {};
//     $scope.writeUserData = function (userId, coordinates){
//         coordinates = $scope.coordinates;
//         console.log(coordinates);
//         userId = $scope.user.userId;
//         firebase.database().ref('users/' + userId).set({
//             coordinates : coordinates,
//             userId: userId
//         });
//     }
// });

app.controller('initializeMap', function($scope, databaseAndAuth, NgMap){

    NgMap.getMap().then(function(map) {
        console.log(map.setCenter());
        console.log('markers', map.markers);
        console.log('shapes', map.shapes);
    });
});
    //when the device position changes, update the database;
app.controller('watchCurrentUserLocation', function($window, $scope, databaseAndAuth){
    // $geolocation.watchPosition(function(position) {
    //     $scope.coordinates.latitude = position.latitude;
    //     $scope.coordinates.longitude = position.longitude;

    //     $scope.writeUserData(userId, $scope.coordinates);
    // });
    var success = function (response) {
        console.log('success! ', response.coords);
        $window.coordinates = response.coords;
    };
    var error = function (item) {
        console.log('error! ', item);
    }

    var options = {
      enableHighAccuracy: true,
      timeout: 1,
      maximumAge: Infinity
    };
    navigator.geolocation.watchPosition(success, error, options);
});

