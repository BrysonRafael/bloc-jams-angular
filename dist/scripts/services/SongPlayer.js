(function() {
    function SongPlayer(Fixtures) {
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
        * @desc Active song object from list of songs
        * @type {Object}
        */
        SongPlayer.currentSong = null;

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
        };

        /**
        * @desc Allows users to revert back to previous song via SongPlayer
        * @type function
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

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

        /**
        * @function stopSong
        * @desc
        */
        var stopSong = function() {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        };

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
        };

        /**
        * @desc Finds the index of a song in the songs array
        * @type function
        */
        var getSongIndex = function(song) {
          return currentAlbum.songs.indexOf(song);
        };

        var playSong = function() {
          currentBuzzObject.play();
          song.playing = true;
        };


    return SongPlayer;
  };

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
