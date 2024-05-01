function aud_play_pause() {
                var myAudio = document.getElementById("myAudio");
                if (myAudio.paused) {
                    myAudio.play();
                } else {
                    myAudio.pause();
                }
            }