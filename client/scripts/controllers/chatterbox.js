angular.module('myApp').controller('chatterboxCtrl', function($scope, $location) {
  console.log('inside chatterboxCtrl');

  var database = firebase.database();

  $scope.messageArray = [];
  
  $scope.sendMessage = function(userId, text) {
 
    chatId = Math.floor((Math.random() * 10000000000000) + 1);
    text = $scope.text;
    var milliseconds = +new Date(Date());

    database.ref('chats/' + milliseconds).set({
      username: 'Hanyen',
      text: text,
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
    
    ref.orderByChild('text').on('value', function(chat) {
  
      var newArray = [];
      reverseForIn(chat.val(), function(key){ newArray.push(this[key]); });
      $scope.messageArray = newArray;

    });

  };

  $scope.openLink = function(location) {
    $location.path(location);
  }

});