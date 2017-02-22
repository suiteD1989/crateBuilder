  var app = angular.module('exampleApp', ['spotify', 'ui.bootstrap']);
      app.config(function (SpotifyProvider) {
        SpotifyProvider.setClientId('');
        SpotifyProvider.setRedirectUri('');
        SpotifyProvider.setScope('playlist-read-private');
    });

  app.controller('MainController', ['$scope', '$http', 'Spotify', function ($scope, $http, Spotify) { 

  $scope.login = function() {
    Spotify.login().then(function (data) {
      console.log(data);
      alert("You are now logged in");
    }, function () {
      console.log('didn\'t log in');
    })
  };

  $scope.getSavedUserTracks = function() {
    Spotify.getSavedUserTracks().then(function(){
      $scope.savedtracks = data;
      console.log(data);
    });
  };

  $scope.showUserPlaylists = function() {
    Spotify.getUserPlaylists($scope.currentUser).then(function (data) {
      $scope.userplaylist = data.items;
    });
  };

  $scope.showPlaylistInfo = function($id) {
    Spotify.getPlaylistTracks($scope.currentUser, $id).then(function (data) {
      $scope.playlisttracks = data;
      $scope.playlistartists = data; 
    });
  };

  $scope.getCurrentUser = function() {
    Spotify.getCurrentUser().then(function (data) {
      $scope.currentUser = data.id;
    });
  };

  $scope.discogsQuery = function($queryArtist, $queryTrack) {
    $http.get('https://api.discogs.com/database/search?q=' + $queryArtist  + ' ' + $queryTrack.substring(0, $queryTrack.indexOf('-')), 
    {headers: { Authorization: ' Discogs key=rJIwIgahhwnMAiEgnKUm, secret=UMOtsLfpgZhbXRJKlELmKXmeFESmBYzN '}})
    .then(function(response) {
      console.log(response);       
      
      $scope.purchaseURL = 'www.discogs.com' + response.data.results[1].uri;
      console.log(response.data.results[1].uri);
    });
  };

}]);
