const video = document.getElementById("myVideo");
const playButton = document.getElementById("playButton");

playButton.addEventListener("click", function() {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
});