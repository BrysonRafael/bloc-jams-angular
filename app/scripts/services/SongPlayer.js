(function() {
    function SongPlayer($rootScope, Fixtures) {
          /**
          * @desc Allows users to play and pause songs
          * @type function
          */
         var SongPlayer = {};

         /**
         * @desc currentAlbum finds the index of the song object within the songs array
         * @type function
         */
         var currentAlbum = Fixtures.getAlbum();

         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
         var currentBuzzObject = null;

         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */

        var setSong = function(song) {
           if (currentBuzzObject) {
             stopSong();
           }


          currentBuzzObject = new buzz.sound(song.audioUrl, {
             formats: ['mp3'],
             preload: true
           });

          currentBuzzObject.bind('timeupdate', function() {
            $rootScope.$apply(function() {
              SongPlayer.currentTime = currentBuzzObject.getTime();
            });
          });

          SongPlayer.currentSong = song;

         };

        /**
        * @desc Finds the index of a song in the songs array
        * @type function
        */
        var getSongIndex = function(song) {
          return currentAlbum.songs.indexOf(song);
        };

        SongPlayer.currentSong = null;
        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;
        /**
        * @function setCurrentTime
        * @desc Set current time (in seconds) of currently playing song
        * @param {Number} time*/

        SongPlayer.setCurrentTime = function(time) {
          if (currentBuzzObject) {
            currentBuzzObject.setTime(time);
          }
        };

        SongPlayer.volume = null;
        /**
        * @function
        * @desc Set current volume of currently playing song
        * @param {Number}*/

        SongPlayer.setVolume = function(value) {
          currentBuzzObject.setVolume(value);
        };

        var playSong = function() {
          currentBuzzObject.play();
          song.playing = true;
        };
         /**
         * @desc Plays the currenly set song
         * @type function
         */

         SongPlayer.play = function(song) {
           song = song || SongPlayer.currentSong;
           if (SongPlayer.currentSong !== song) {
             setSong(song);
             currentBuzzObject.play();
             song.playing = true;
           } else if (SongPlayer.currentSong === song) {
               if (currentBuzzObject.isPaused()) {
                 currentBuzzObject.play();
               }
             }
          };

          /**
          * @desc Allows users to play a song via the song player
          * @type function
          */

          SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
            /**
            * @desc Allows users to pause a song via the song player
            * @type function
            */
          };

          SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            /**
            * @desc Allows users to revert back to previous song via SongPlayer
            * @type function
            */

            if (currentSongIndex < 0) {
              stopSong();
              /**
              * @desc If the user is on the first song and clicks previous button, stops current song and sets currently playing song to first song.
              * @type function
              */
            } else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
              /**
              * @desc If not on the first song, moves to previous song and plays it.
              * @type function
              */
            }
          };

          SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            /**
            * @desc Allows users to play the next song via SongPlayer
            * @type function
            */

            if (currentSongIndex == songs.length) {
              stopSong();
              /**
              * @desc If the user is on the last song and clicks next button, stops current song and sets currently playing song to last song.
              * @type function
              */
            } else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
              /**
              * @desc If not on the first song, moves to previous song and plays it.
              * @type function
              */
            }
          };

          var stopSong = function() {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
          };


    return SongPlayer;
  };

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
