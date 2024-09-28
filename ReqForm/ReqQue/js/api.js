let allSongsElm = document.getElementById("allSongs");
let loaderElm = document.getElementById("loader");
let errorMessageElm = document.getElementById("errorMessage");

function setErrorDisplay() {
  loaderElm.style.display = "none";
  allSongsElm.style.display = "none";
  errorMessageElm.style.display = "block";
}

// Fetching the data from the API
fetch("https://api.apispreadsheets.com/data/qOnLkupOU7WkHLCD/")
  .then((res) => {
    if (res.status === 200) {
      return res.json(); // Parse the JSON response
    } else {
      console.error("Error fetching data: " + res.status);
      setErrorDisplay();
    }
  })
  .then((data) => {
    if (!data || !data.data) {
      console.error("No data received or data structure incorrect:", data);
      setErrorDisplay();
      return;
    }

    const yourData = data["data"];

    // Loop through the fetched data and create HTML elements to display
    yourData.forEach((rowInfo) => {
      let rowInfoDiv = document.createElement("div");
      rowInfoDiv.classList.add("song-row");

      // Name (submitter's name)
      let rowName = document.createElement("h4");
      let rowNameNode = document.createTextNode("Submitted by: " + (rowInfo["Name"] || "Unknown"));
      rowName.appendChild(rowNameNode);
      rowName.classList.add("Name");

      // Song Name (check if "Song" field exists)
      let rowSong = document.createElement("h2");
      let songText = rowInfo["Song"] ? rowInfo["Song"] : "No song title available";
      let rowSongNode = document.createTextNode(songText); // Use default text if "Song" is missing
      rowSong.appendChild(rowSongNode);
      rowSong.classList.add("Song");

      // Artist (check if "Artist" field exists)
      let rowArtist = document.createElement("h4");
      let artistText = rowInfo["Artist"] ? rowInfo["Artist"] : "Unknown artist";
      let rowArtistNode = document.createTextNode("Artist: " + artistText);
      rowArtist.appendChild(rowArtistNode);
      rowArtist.classList.add("Artist");

      // Shoutout (check if "Shoutout" field exists)
      let rowShoutout = document.createElement("p");
      let shoutoutText = rowInfo["Shoutout"] ? rowInfo["Shoutout"] : "No shoutout";
      let rowShoutoutNode = document.createTextNode("Shoutout: " + shoutoutText);
      rowShoutout.appendChild(rowShoutoutNode);
      rowShoutout.classList.add("Shoutout");

      // Link to song (check if "Link" field exists)
      let rowLink = document.createElement("a");
      if (rowInfo["Link"]) {
        rowLink.setAttribute("href", rowInfo["Link"]);
        rowLink.setAttribute("target", "_blank");
        let rowLinkNode = document.createTextNode("Listen");
        rowLink.appendChild(rowLinkNode);
      } else {
        let rowLinkNode = document.createTextNode("No link available");
        rowLink.appendChild(rowLinkNode);
      }
      rowLink.classList.add("Link");

      // Append the elements to the row div
      rowInfoDiv.appendChild(rowName);      // Add the submitter's name
      rowInfoDiv.appendChild(rowSong);      // Add the song name
      rowInfoDiv.appendChild(rowArtist);    // Add the artist name
      rowInfoDiv.appendChild(rowShoutout);  // Add the shoutout
      rowInfoDiv.appendChild(rowLink);      // Add the song link

      // Add the row to the allSongs div
      allSongsElm.appendChild(rowInfoDiv);
    });

    // Hide loader and show the list of songs
    loaderElm.style.display = "none";
    allSongsElm.style.display = "block";
    errorMessageElm.style.display = "none";
  })
  .catch((err) => {
    console.error("Error fetching data: ", err);
    setErrorDisplay();
  });
