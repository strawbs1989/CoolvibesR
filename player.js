document.getElementById("popout-button").addEventListener("click", function() {
  var player = document.getElementById("radio-player");
  var playerUrl = player.src;
  window.open(playerUrl, "Radio Player", "width=400,height=200");
});
