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

      // Your Name
      let rowSong = document.createElement("h2");
      let rowSongNode = document.createTextNode(rowInfo["Name"]);
      rowSong.appendChild(rowSongNode);
      rowSong.classList.add("Name");
	  
	  // Song Name
      let rowSong = document.createElement("h2");
      let rowSongNode = document.createTextNode(rowInfo["Song"]);
      rowSong.appendChild(rowSongNode);
      rowSong.classList.add("Song");

      // Artist
      let rowArtist = document.createElement("h4");
      let rowArtistNode = document.createTextNode("Artist: " + rowInfo["Artist"]);
      rowArtist.appendChild(rowArtistNode);
      rowArtist.classList.add("Artist");

      // Link to song
      let rowLink = document.createElement("a");
      rowLink.setAttribute("href", rowInfo["Link"]);
      rowLink.setAttribute("target", "_blank");
      let rowLinkNode = document.createTextNode("Listen");
      rowLink.appendChild(rowLinkNode);
      rowLink.classList.add("Link");
	  
	  // Shoutout
      let rowLink = document.createElement("a");
      rowLink.setAttribute("href", rowInfo["Shoutout"]);
      rowLink.setAttribute("target", "_blank");
      let rowLinkNode = document.createTextNode("Shoutout");
      rowLink.appendChild(rowLinkNode);
      rowLink.classList.add("Shoutout");

      // Append the elements to the row div
      rowInfoDiv.appendChild(rowName);
	  rowInfoDiv.appendChild(rowSong);
      rowInfoDiv.appendChild(rowArtist);
      rowInfoDiv.appendChild(rowLink);
	  rowInfoDiv.appendChild(rowShoutout);

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
