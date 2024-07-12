<?php

if(isset($_POST['btn-send']))
{
	$Your Name = $_POST['YName'];
	$Song/Artist = $_POST['Song/Artist'];
	$Msg = $_POST['msg'];
	
	if(empty($Your Name) || empty($Song/Artist) || empty($Msg))
	{
      header('location:requests/request.php?error'); 
	}
	else
	
	{
	$to = "coolvibes1989@gmail.com";

    if(mail($to,$Msg,$Song/Artist,$Email))
	{
	header("location:requests/request.php?success");	
	}
	
	}
}
else
{
   header("location:requests/request.php");	
}
?>


