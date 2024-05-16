<?php
// Process the form submission
$from = $_POST['from'];
$to = $_POST['to'];
$djs = $_POST['djs'];
$message = $_POST['message'];
$songrequest = $_POST['songrequest'];

// Format the request data
$requestData = "From: $from\nTo: $to\nDJ: $djs\nMessage: $message\nSong Request: $songrequest\n";

// Store the request in a flat file
$file = '/requests/requests.txt';
$current = file_get_contents($file);
$current .= $requestData;
file_put_contents($file, $current);

// Email notification
$to = "jnlravers@gmail.com";
$subject = "New Song Request";
$body = $requestData;
mail($to, $subject, $body);

// Redirect to success page
header("Location: /requests/success.php");
exit();
?>
