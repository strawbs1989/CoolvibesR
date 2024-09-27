let allSongsElm = document.getElementById("allSongs")
		let loaderElm = document.getElementById("loader")
		let errorMessageElm = document.getElementById("errorMessage")
		
		function setErrorDisplay(){
			loaderElm.style.display = "none"
			allSongsElm.style.display = "none"
			errorMessageElm.style.display = "block"
		}
			
		fetch("https://api.apispreadsheets.com/data/7OySATKrFeiUEqMz/").then(res=>{
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
						
						let rowShoutout = document.createElement("a")
						rowLink.setAttribute("href", rowInfo["Shoutout"])
						rowLink.setAttribute("target","_blank")
						

						rowInfoDiv.appendChild(rowName)
						rowInfoDiv.appendChild(rowSong)
						rowInfoDiv.appendChild(rowArtist)
						rowInfoDiv.appendChild(rowLink)
						rowInfoDiv.appendChild(rowShoutout)
						

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
		
		