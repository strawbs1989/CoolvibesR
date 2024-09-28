fetch("https://api.apispreadsheets.com/data/7OySATKrFeiUEqMz/")
  .then(res => {
    if (res.status === 200) {
      res.json()
        .then(data => {
          const yourData = data["data"];
          let rowInfo = yourData[0];

          let rowInfoDiv = document.createElement("div");
          rowInfoDiv.classList.add("elemsRow");

          let rowWeek = document.createElement("p");
          let rowWeekNode = document.createTextNode("The week of " + rowInfo["Week"]);
          rowWeek.appendChild(rowWeekNode);
          rowWeek.classList.add("Week");

          let rowShow = document.createElement("p");
          let rowShowNode = document.createTextNode("I have been binging " + rowInfo["Show"] + ",");
          rowShow.appendChild(rowShowNode);
          rowShow.classList.add("Show");

          let rowMusic = document.createElement("p");
          let rowMusicNode = document.createTextNode("listening to " + rowInfo["Music"] + ",");
          rowMusic.appendChild(rowMusicNode);
          rowMusic.classList.add("Music");

          let rowLanguage = document.createElement("p");
          let rowLanguageNode = document.createTextNode(" and practicing up on " + rowInfo["Language"] + "! ");
          rowLanguage.appendChild(rowLanguageNode);
          rowLanguage.classList.add("Language");

          let rowQuote = document.createElement("p");
          let rowQuoteNode = document.createTextNode("A quote that got to me: ");
          rowQuote.appendChild(rowQuoteNode);

          let rowQuoteItalics = document.createElement("i");
          let rowQuoteItalicsNode = document.createTextNode(rowInfo["Quote"]);
          rowQuoteItalics.appendChild(rowQuoteItalicsNode);
          rowQuote.classList.add("Quote");
          rowQuoteItalics.classList.add("Quote");

          rowInfoDiv.appendChild(rowWeek);
          rowInfoDiv.appendChild(rowShow);
          rowInfoDiv.appendChild(rowMusic);
          rowInfoDiv.appendChild(rowLanguage);
          rowInfoDiv.appendChild(rowQuote);
          rowInfoDiv.appendChild(rowQuoteItalics);

          // Append to your HTML element
          allElemsElm.appendChild(rowInfoDiv);

          // Display content
          allElemsElm.style.display = "block";
          errorMessageElm.style.display = "none";
        })
        .catch(err => {
          setErrorDisplay();  // Handle any errors in parsing the JSON
        });
    } else {
      setErrorDisplay();  // Handle any non-200 responses
    }
  })
  .catch(err => {
    setErrorDisplay();  // Handle fetch error
  });

// Function to handle error display
function setErrorDisplay() {
  allElemsElm.style.display = "none";
  errorMessageElm.style.display = "block";
  loaderElm.style.display = "none";
}
