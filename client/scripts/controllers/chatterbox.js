angular.module('myApp').controller('chatterboxCtrl', function($scope, $location, databaseAndAuth) {
  console.log('inside chatterboxCtrl');

  var database = firebase.database();

  $scope.messageArray = [];
  
  $scope.sendMessage = function(userId, text) {
    var chatEmail = databaseAndAuth.auth.currentUser.email;
    var chatUsername = chatEmail.slice(0, chatEmail.indexOf('@'));
    
    var chatId = +new Date(Date()); //use time in milliseconds for chatId

    database.ref('chats/' + chatId).set({
      username: chatUsername,
      text: $scope.text,
      createdAt: Date()
    });

  };

  $scope.fetchMessage = function() {
    //a helper function to reverse the order of chats
    function reverseForIn(obj, func) {
      var arr = [];
      for (var key in obj) {
        arr.push(key);
      }
      for (var i=arr.length-1; i>=0; i--) {
        func.call(obj, arr[i]);
      }
    }

    var ref = database.ref('chats');
    
    ref.limitToLast(9).on('value', function(chat) {
      var newArray = [];
      reverseForIn(chat.val(), function(key){ newArray.push(this[key]); });
      $scope.messageArray = newArray;
    });

  };

  $scope.showPartial = function(location) {
    $location.path(location);
  }

});