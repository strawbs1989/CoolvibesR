let allSongsElm = document.getElementById("allSongs")
		let loaderElm = document.getElementById("loader")
		let errorMessageElm = document.getElementById("errorMessage")
		
		function setErrorDisplay(){
			loaderElm.style.display = "none"
			allSongsElm.style.display = "none"
			errorMessageElm.style.display = "block"
		}
		function deleteRow(rowID) { 

			fetch("https://api.apispreadsheets.com/data/qOnLkupOU7WkHLCD/?query=deletefromqOnLkupOU7WkHLCDwhereID="+ rowID.toString()).then(res=>{
				if (res.status === 200){
		// SUCCESS
	alert("Successfully Deleted")
					location.reload();
				}
				else{
					// ERROR
					alert("Error Deleting!")
				}
			}).catch(err => {
				alert("Error Deleting!")
			})
		}

					

		function updateSongNotes(rowID){
			const currValueOfNotes = document.getElementById("rowNotesField" + rowID.toString()).value

			fetch("https://api.apispreadsheets.com/data/qOnLkupOU7WkHLCD/", {
				method: "POST",
				body: JSON.stringify({"data": {"Notes": currValueOfNotes}, "query": "select*fromqOnLkupOU7WkHLCDwhereID=" + rowID.toString()}),
			}).then(res =>{
				if (res.status === 201){
					// SUCCESS
					alert("Notes Updated")
				}
				else{
					// ERROR
					alert("Notes Not Updated")
				}
			})
		}
			
		fetch("https://api.apispreadsheets.com/data/qOnLkupOU7WkHLCD/").then(res=>{
			if (res.status === 200){
				res.json().then(data=>{
					const yourData = data["data"]
					for(let i = 0; i < yourData.length; i++){
						let rowInfo = yourData[i]

						let rowInfoDiv = document.createElement("div")
						rowInfoDiv.classList.add("song-row")

						let rowName = document.createElement("h2")
						let rowNameNode = document.createTextNode(rowInfo["Name"])
						rowName.appendChild(rowNameNode)
						rowName.classList.add("Name")
						
						let rowSong = document.createElement("h2")
						let rowSongNode = document.createTextNode(rowInfo["Song"])
						rowSong.appendChild(rowSongNode)
						rowSong.classList.add("Song")

						let rowArtist = document.createElement("h4")
						let rowArtistNode = document.createTextNode(rowInfo["Artist"])
						rowArtist.appendChild(rowArtistNode)
						rowArtist.classList.add("Artist")

						let rowLink = document.createElement("a")
						rowLink.setAttribute("href", rowInfo["Link"])
						rowLink.setAttribute("target","_blank")
						let rowLinkNode = document.createTextNode(rowInfo["Link"])
						rowLink.appendChild(rowLinkNode)
						rowLink.classList.add("Link")
						
						let rowShoutout = document.createElement("h4")
						let rowShoutoutNode = document.createTextNode(rowInfo["Shoutout"])
						rowShoutout.appendChild(rowShoutoutNode)
						rowShoutout.classList.add("Shoutout")

						let rowDeleteButton = document.createElement("button")
						rowDeleteButton.setAttribute("onclick", "deleteRow(" + (rowInfo['ID']).toString() + ")")
						let rowDeleteButtonNode = document.createTextNode("Delete Song")
						rowDeleteButton.appendChild(rowDeleteButtonNode)
						rowDeleteButton.classList.add("deleteButton")

						let rowNotesField = document.createElement("input")
						rowNotesField.setAttribute("type", "text")
						rowNotesField.setAttribute("id", "rowNotesField" + rowInfo['ID'].toString())
						rowNotesField.setAttribute("value", rowInfo['Notes'])
						rowNotesField.classList.add("rowNotesField")
						
						let rowNotesSaveBtn = document.createElement("button")
						rowNotesSaveBtn.setAttribute("onclick", "updateSongNotes(" + rowInfo['ID'].toString() + ')')

						let rowNotesSaveBtnNode = document.createTextNode("Save Notes")
						rowNotesSaveBtn.appendChild(rowNotesSaveBtnNode)
						rowNotesSaveBtn.setAttribute("id", "rowNotesSaveBtn" + rowInfo['ID'].toString())
						rowNotesSaveBtn.classList.add("rowNotesSaveBtn")

						
                        rowInfoDiv.appendChild(rowName)
						rowInfoDiv.appendChild(rowSong)
						rowInfoDiv.appendChild(rowArtist)
						rowInfoDiv.appendChild(rowLink)
						rowInfoDiv.appendChild(rowShoutout)
                        rowInfoDiv.appendChild(rowDeleteButton)
				
						rowInfoDiv.appendChild(rowNotesField)
						rowInfoDiv.appendChild(rowNotesSaveBtn)
						rowInfoDiv.appendChild(rowDeleteButton)

						
						allSongsElm.appendChild(rowInfoDiv)

					}
					
					loaderElm.style.display = "none"
					allSongsElm.style.display = "block"
					errorMessageElm.style.display = "none"

				}).catch(err => {
					setErrorDisplay()
				})
			}
			else{
				setErrorDisplay()
			}
		}).catch(err =>{
			setErrorDisplay()
		})