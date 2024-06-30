// Need to check the canPlayType first or an exception
    // will be thrown for those browsers that don't support it      

    var myAudio = document.createElement('audio');
   
    if (myAudio.canPlayType) {
     
       // Currently canPlayType(type) returns: "", "maybe" or "probably"

       var canPlayMp3 = !!myAudio.canPlayType && "" != myAudio.canPlayType('audio/mpeg');
       var canPlayOgg = !!myAudio.canPlayType && "" != myAudio.canPlayType('audio/ogg; codecs="vorbis"');
    }