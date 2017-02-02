angular.module('myApp').config(function($routeProvider, $httpProvider) {
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