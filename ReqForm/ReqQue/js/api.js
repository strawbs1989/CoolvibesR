let allSongsElm = document.getElementById("allSongs");
let loaderElm = document.getElementById("loader");
let errorMessageElm = document.getElementById("errorMessage");

function setErrorDisplay() {
  loaderElm.style.display = "none";
  allSongsElm.style.display = "none";
  errorMessageElm.style.display = "block";
}

function deleteRow(rowID) {
  fetch("https://api.apispreadsheets.com/data/qOnLkupOU7WkHLCD/?query=deletefromqOnLkupOU7WkHLCDwhereID=" + rowID.toString())
    .then((res) => {
      if (res.status === 200) {
        alert("Successfully Deleted");
        location.reload();
      } else {
        alert("Error Deleting!");
      }
    })
    .catch((err) => {
      alert("Error Deleting!");
    });
}


function updateSongNotes(rowID) {
  const currValueOfNotes = document.getElementById("rowNotesField" + rowID.toString()).value;

  fetch("https://api.apispreadsheets.com/data/qOnLkupOU7WkHLCD/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: { Notes: currValueOfNotes },
      query: "select * from 12730 where ID=" + rowID.toString(),
    }),
  })
    .then((res) => {
      if (res.status === 201) {
        alert("Notes Updated");
      } else {
        console.error("Error Updating Notes:", res.status);
        alert("Notes Not Updated");
      }
    })
    .catch((err) => {
      console.error("Error Updating Notes:", err);
      alert("Error Updating Notes!");
    });
}

// Fetching the data from the spreadsheet
fetch("https://api.apispreadsheets.com/data/1-Cf4e1JKN0VMg14vwr34DZRkPd50SraDMUMWsI7KBXE/")
  .then((res) => {
    if (res.status === 200) {
      console.log("Data fetched successfully.");
      return res.json();
    } else {
      console.error("Error fetching data:", res.status);
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
    for (let i = 0; i < yourData.length; i++) {
      let rowInfo = yourData[i];

      let rowInfoDiv = document.createElement("div");
      rowInfoDiv.classList.add("song-row");

      let rowSong = document.createElement("h2");
      let rowSongNode = document.createTextNode(rowInfo["Song"]);
      rowSong.appendChild(rowSongNode);
      rowSong.classList.add("Song");

      let rowArtist = document.createElement("h4");
      let rowArtistNode = document.createTextNode(rowInfo["Artist"]);
      rowArtist.appendChild(rowArtistNode);
      rowArtist.classList.add("Artist");

      let rowLink = document.createElement("a");
      rowLink.setAttribute("href", rowInfo["Link"]);
      rowLink.setAttribute("target", "_blank");
      let rowLinkNode = document.createTextNode(rowInfo["Link"]);
      rowLink.appendChild(rowLinkNode);
      rowLink.classList.add("Link");

      let rowDeleteButton = document.createElement("button");
      rowDeleteButton.setAttribute("onclick", "deleteRow(" + rowInfo["ID"].toString() + ")");
      let rowDeleteButtonNode = document.createTextNode("Delete Song");
      rowDeleteButton.appendChild(rowDeleteButtonNode);
      rowDeleteButton.classList.add("deleteButton");

      let rowNotesField = document.createElement("input");
      rowNotesField.setAttribute("type", "text");
      rowNotesField.setAttribute("id", "rowNotesField" + rowInfo["ID"].toString());
      rowNotesField.setAttribute("value", rowInfo["Notes"]);
      rowNotesField.classList.add("rowNotesField");

      let rowNotesSaveBtn = document.createElement("button");
      rowNotesSaveBtn.setAttribute("onclick", "updateSongNotes(" + rowInfo["ID"].toString() + ")");
      let rowNotesSaveBtnNode = document.createTextNode("Save Notes");
      rowNotesSaveBtn.appendChild(rowNotesSaveBtnNode);
      rowNotesSaveBtn.classList.add("rowNotesSaveBtn");

      // Append everything to rowInfoDiv
      rowInfoDiv.appendChild(rowSong);
      rowInfoDiv.appendChild(rowArtist);
      rowInfoDiv.appendChild(rowLink);
      rowInfoDiv.appendChild(rowNotesField);
      rowInfoDiv.appendChild(rowNotesSaveBtn);
      rowInfoDiv.appendChild(rowDeleteButton);

      allSongsElm.appendChild(rowInfoDiv);
    }

    // Hide loader and display songs
    loaderElm.style.display = "none";
    allSongsElm.style.display = "block";
    errorMessageElm.style.display = "none";
  })
  .catch((err) => {
    console.error("Error fetching data:", err);
    setErrorDisplay();
  });


// Fetching the data from the spreadsheet
fetch("https://api.apispreadsheets.com/data/qOnLkupOU7WkHLCD/")
  .then((res) => {
    if (res.status === 200) {
      return res.json();
    } else {
      setErrorDisplay();
    }
  })
  .then((data) => {
    const yourData = data["data"];
    for (let i = 0; i < yourData.length; i++) {
      let rowInfo = yourData[i];

      let rowInfoDiv = document.createElement("div");
      rowInfoDiv.classList.add("song-row");

      let rowSong = document.createElement("h2");
      let rowSongNode = document.createTextNode(rowInfo["Song"]);
      rowSong.appendChild(rowSongNode);
      rowSong.classList.add("Song");

      let rowArtist = document.createElement("h4");
      let rowArtistNode = document.createTextNode(rowInfo["Artist"]);
      rowArtist.appendChild(rowArtistNode);
      rowArtist.classList.add("Artist");

      let rowLink = document.createElement("a");
      rowLink.setAttribute("href", rowInfo["Link"]);
      rowLink.setAttribute("target", "_blank");
      let rowLinkNode = document.createTextNode(rowInfo["Link"]);
      rowLink.appendChild(rowLinkNode);
      rowLink.classList.add("Link");

      let rowDeleteButton = document.createElement("button");
      rowDeleteButton.setAttribute("onclick", "deleteRow(" + rowInfo["ID"].toString() + ")");
      let rowDeleteButtonNode = document.createTextNode("Delete Song");
      rowDeleteButton.appendChild(rowDeleteButtonNode);
      rowDeleteButton.classList.add("deleteButton");

      let rowNotesField = document.createElement("input");
      rowNotesField.setAttribute("type", "text");
      rowNotesField.setAttribute("id", "rowNotesField" + rowInfo["ID"].toString());
      rowNotesField.setAttribute("value", rowInfo["Notes"]);
      rowNotesField.classList.add("rowNotesField");

      let rowNotesSaveBtn = document.createElement("button");
      rowNotesSaveBtn.setAttribute("onclick", "updateSongNotes(" + rowInfo["ID"].toString() + ")");
      let rowNotesSaveBtnNode = document.createTextNode("Save Notes");
      rowNotesSaveBtn.appendChild(rowNotesSaveBtnNode);
      rowNotesSaveBtn.classList.add("rowNotesSaveBtn");

      // Append everything to rowInfoDiv
      rowInfoDiv.appendChild(rowSong);
      rowInfoDiv.appendChild(rowArtist);
      rowInfoDiv.appendChild(rowLink);
      rowInfoDiv.appendChild(rowNotesField);
      rowInfoDiv.appendChild(rowNotesSaveBtn);
      rowInfoDiv.appendChild(rowDeleteButton);

      allSongsElm.appendChild(rowInfoDiv);
    }

    // Hide loader and display songs
    loaderElm.style.display = "none";
    allSongsElm.style.display = "block";
    errorMessageElm.style.display = "none";
  })
  .catch((err) => {
    setErrorDisplay();
  });