<?php
header('Content-Type: text/html');
// Process form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data
    $from = $_POST['from'];
    $to = $_POST['to'];
    $dj = $_POST['djs'];
    $message = $_POST['message'];
    $songRequest = $_POST['songrequest'];
    
    // Format data as CSV
    $formData = "$from,$to,$dj,$message,$songRequest\n";
    
    // Append data to the flat file
    $file = 'requests.txt';
    file_put_contents($file, $formData, FILE_APPEND | LOCK_EX);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Song Request Form</title>
    <link href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css" rel="stylesheet">
<link href="https://coolvibes-reloaded.com/requests/test/style.css" rel="stylesheet">
</head>
<body>
    <form action="" method="post">
        
        <label for="from">From:</label><br>
	<input type="text" class="box" name="from" id="from" required />
  
  <br>
  <label for="text">To:</label><br>
  <input type="text" name="to" id="to" pattern="[a-z]{4,8}" />
  <p>To must be lowercase and 4-8 characters in length.</p>
        <select name="djs" required>
            <option value="dj kat">Classic Kat</option>
            <option value="dj strawbs">Strawbs</option>
            <option value="dj dale">Dale</option>
            <option value="dj jon">Jon</option>
            <option value="dj simon">Simon</option>
	        <option value="dj twist">Christina</option>
        </select>
        <label for="text">Message:</label><br>
  <input type="text" name="message" id="message" required />
  
  
  <br>
  <label for="song request">Song Request:</label><br>
  <input type="text" name="songrequest" placeholder="Ex Plan b She Said" id="songrequest" rows="3" cols="30">
  
  <br><br>
					
					
    <input type="hidden" name="redirect" value="https://coolvibes-reloaded.com/requests/test/success">
        <button type="submit">Submit</button>
    </form>
</body>
</html>
