let allSongsElm = document.getElementById("allSongs");
let loaderElm = document.getElementById("loader");
let errorMessageElm = document.getElementById("errorMessage");

function setErrorDisplay() {
    loaderElm.style.display = "none";
    allSongsElm.style.display = "none";
    errorMessageElm.style.display = "block";
}

fetch("https://api.apispreadsheets.com/data/7OySATKrFeiUEqMz/")
    .then(res => {
        if (res.status === 200) {
            res.json().then(data => {
                const yourData = data["data"];

                // Log the entire response to check the structure
                console.log("Fetched data:", yourData);

                // Loop over the data and check if Song Name, Your Name, Artist, and Shoutout fields exist
                for (let i = 0; i < yourData.length; i++) {
                    let rowInfo = yourData[i];

                    // Log each row's data to check what fields are available
                    console.log("Row data:", rowInfo);

                    let rowInfoDiv = document.createElement("div");
                    rowInfoDiv.classList.add("song-row");

                    // Create the element for "Your Name"
                    let rowName = document.createElement("h3");
                    let rowNameNode = document.createTextNode("Your Name: " + (rowInfo["Your Name"] || "N/A"));
                    rowName.appendChild(rowNameNode);
                    rowName.classList.add("Name");

                    // Create the element for "Song Name"
                    let rowSong = document.createElement("h2");
                    let rowSongNode = document.createTextNode("Song Name: " + (rowInfo["Song Name"] || "N/A"));
                    rowSong.appendChild(rowSongNode);
                    rowSong.classList.add("Song");

                    // Create the element for "Artist"
                    let rowArtist = document.createElement("h4");
                    let rowArtistNode = document.createTextNode("Artist: " + (rowInfo["Artist"] || "N/A"));
                    rowArtist.appendChild(rowArtistNode);
                    rowArtist.classList.add("Artist");

                    // Create the element for "Shoutout"
                    let rowLink = document.createElement("a");
                    let rowLinkNode = document.createTextNode("Shoutout: " + (rowInfo["Shoutout"] || "N/A"));
                    rowLink.appendChild(rowLinkNode);
                    rowLink.classList.add("Shoutout");

                    // Append all elements to the container
                    rowInfoDiv.appendChild(rowName);
                    rowInfoDiv.appendChild(rowSong);
                    rowInfoDiv.appendChild(rowArtist);
                    rowInfoDiv.appendChild(rowLink);

                    // Append the row to the parent element
                    allSongsElm.appendChild(rowInfoDiv);
                }

                // Hide loader, show song list
                loaderElm.style.display = "none";
                allSongsElm.style.display = "block";
                errorMessageElm.style.display = "none";
            }).catch(err => {
                console.log("Error parsing JSON:", err);
                setErrorDisplay();
            });
        } else {
            console.log("Fetch error. Status:", res.status);
            setErrorDisplay();
        }
    })
    .catch(err => {
        console.log("Fetch error:", err);
        setErrorDisplay();
    });
