<!DOCTYPE HTML>
<html>  
<body>
<div class="container">
<div class="row">
<div class="col-lg-6 m-auto">
<div class="card">
<div class="card-title">
<h2 class="text-center py-2"> Requests </h2>
<hr>
<?php
$Msg = "";
if(isset($_GET['error']))
{
	$Msg = "Fill In Required";
}   echo '<div class="alert alert-danger">'.$Msg.'</div>';

if(isset($_GET['success'))
{
$Msg = "Request Successful";	
echo '<div class="alert alert-success">'.$Msg.'</div>';
}


?>
<div class="card-body">
<form action="requests/success.php" method="get">
<div>
        <label for="choose dj">Choose You're Requesting Dj:</label><br>
        <select name="choose dj" id="choose dj">
          <option value="dj">Strawbs</option>
          <option value="dj">Selector Frost</option>
          <option value="dj">Roksta</option>
          <option value="dj">Simon</option>
          <option value="dj">Kat</option>
        </select>
      </div>
      <br>
Your Name: <input type="text" name="name" placeholder="Your Name" required><br>
Song/Artist: <input type="text" name="song/artist" placeholder="song/artist" required><br>
Dedication: <textarea name="msg" class="form-contrl" placeholder="example, please play some 80s from jon doe"></textarea><br>
<button>
Send Request
</button>
</form>
</div>

</body>
</html>

