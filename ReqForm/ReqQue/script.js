let allSongsElm = document.getElementById("allSongs");
let loaderElm = document.getElementById("loader");
let errorMessageElm = document.getElementById("errorMessage");

function setErrorDisplay() {
    loaderElm.style.display = "none";
    allSongsElm.style.display = "none";
    errorMessageElm.style.display = "block";
}

fetch("https://api.apispreadsheets.com/data/7OySATKrFeiUEqMz/").then(res => {
    if (res.status === 200) {
        res.json().then(data => {
            const yourData = data["data"];
            for (let i = 0; i < yourData.length; i++) {
                let rowInfo = yourData[i];

                let rowInfoDiv = document.createElement("div");
                rowInfoDiv.classList.add("song-row");

                // Create the element for "Your Name"
                let rowName = document.createElement("h3");
                let rowNameNode = document.createTextNode("Your Name: " + rowInfo["Your Name"]);
                rowName.appendChild(rowNameNode);
                rowName.classList.add("Name");

                // Create the element for "Song Name"
                let rowSong = document.createElement("h2");
                let rowSongNode = document.createTextNode("Song Name: " + rowInfo["Song Name"]);
                rowSong.appendChild(rowSongNode);
                rowSong.classList.add("Song");

                // Create the element for "Artist"
                let rowArtist = document.createElement("h4");
                let rowArtistNode = document.createTextNode("Artist: " + rowInfo["Artist"]);
                rowArtist.appendChild(rowArtistNode);
                rowArtist.classList.add("Artist");

                // Create the element for "Shoutout"
                let rowLink = document.createElement("a");
                rowLink.setAttribute("href", rowInfo["Shoutout"]);
                rowLink.setAttribute("target", "_blank");
                let rowLinkNode = document.createTextNode("Shoutout: " + rowInfo["Shoutout"]);
                rowLink.appendChild(rowLinkNode);
                rowLink.classList.add("Shoutout");

                // Append all the created elements to the row container
                rowInfoDiv.appendChild(rowName);
                rowInfoDiv.appendChild(rowSong);
                rowInfoDiv.appendChild(rowArtist);
                rowInfoDiv.appendChild(rowLink);

                // Finally, append the entire row to the parent element (allSongsElm)
                allSongsElm.appendChild(rowInfoDiv);
            }

            // Update the visibility of the elements
            loaderElm.style.display = "none";
            allSongsElm.style.display = "block";
            errorMessageElm.style.display = "none";
        }).catch(err => {
            setErrorDisplay();
        });
    } else {
        setErrorDisplay();
    }
}).catch(err => {
    setErrorDisplay();
});
