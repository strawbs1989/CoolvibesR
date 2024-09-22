function SubForm (){
			$.ajax({
				url:"https://api.apispreadsheets.com/data/7OySATKrFeiUEqMz/",
				type:"get",
				data:$("Song Form").serializeArray(),
				success: function(){
					alert("Form Data Submitted :)")
				},
				error: function(){
					alert("There was an error :(")
				}
			});
		}
