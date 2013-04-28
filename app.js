var app = angular.module('myApp', []);

app.filter('reverse',function () {
    return function (item) {
        return item.slice().reverse();
    };
});

app.controller('tweetsController', function ($scope,$http) {
    $scope.tweets = {};
    $scope.users = [];

    $scope.loadTweets = function (){
        var url = 'http://api.twitter.com/1/statuses/user_timeline.json?screen_name=' + $scope.username + '&callback=JSON_CALLBACK';
        $http.jsonp(url)
        .success( function(data, status, headers, config) {
            $scope.addUser($scope.username);
            $scope.tweets = data;
        })
        .error(function (data, status, headers, config) {
            console.log('something wrong when loading json.');
        });
    };

    $scope.addUser = function (user) {
        if ( $scope.users.indexOf(user) != -1)
            this.removeUser(user);
        $scope.users.push(user);
    };

    $scope.removeUser = function (user) {
        $scope.users.splice($scope.users.indexOf(user),1);
    };

    $scope.searchAgain = function (user) {
        $scope.username = user;
        $scope.loadTweets();
    };
});