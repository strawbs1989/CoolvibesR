$("$submit").click(function()
	  var yourname = $["yourname"].val();
	  var songartist = $["songartist"].val();
	  var dedication = $["dedication"].val();
	  
	  if(yourname == '' || songartist == '' || dedication){
	  
	  swal({
  title: "Empty Fields!",
  text: "Check Missing Field!",
  icon: "warning",
  button: "ok!",
});
	 }else{
	 swal({
  title: "Request Successful!",
  text: "Success!",
  icon: "success",
  button: "ok!",
});
	 
	  alert("Fill Required Fields")
	  }
	  {
	  alert("Request Successful");
	  }