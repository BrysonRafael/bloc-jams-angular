(function() {
    function SongPlayer() {
          /**
          * @desc Allows users to play and pause songs
          * @type function
          */
         var SongPlayer = {};
         /**
         * @desc Play or pause songs
         * @type Object
         */
         var currentSong = null;

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
             currentBuzzObject.stop();
             currentSong.playing = null;
           }

           /**
           * @desc Sets a song to the currently playing song
           * @type function
           */


        var playSong = function() {
          currentBuzzObject.play();
          song.playing = true;
        }

           currentBuzzObject = new buzz.sound(song.audioUrl, {
             formats: ['mp3'],
             preload: true
           });

           currentSong = song;
         };

         /**
         * @desc Plays the currenly set song
         * @type function
         */

         SongPlayer.play = function(song) {
           if (currentSong !== song) {
             setSong(song);
             currentBuzzObject.play();
             song.playing = true;
           } else if (currentSong === song) {
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
            currentBuzzObject.pause();
            song.playing = false;
            /**
            * @desc Allows users to pause a song via the song player
            * @type function
            */
            }
        }
      }

    return SongPlayer;
  }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
