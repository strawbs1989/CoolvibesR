<?php
header('Content-Type: text/html');
// Read requests from the flat file
$file = 'requests/requests.txt';
$requests = file_get_contents($file);

// Display requests
echo nl2br($requests); // Convert newlines to <br> tags for HTML display
?>
