


<?php
    // Fetch form data
    $from = htmlspecialchars($_POST["from"]);
    $to = htmlspecialchars($_POST["email"]);
    $dj = htmlspecialchars($_POST["djs"]);
    $message = htmlspecialchars($_POST["message"]);
    $songRequest = htmlspecialchars($_POST["songrequest"]);
?>

<h1>Request Successful</h1>
<p>From: <?php echo $from; ?></p>
<p>To: <?php echo $to; ?></p>
<p>DJ Selected: <?php echo $dj; ?></p>
<p>Message: <?php echo $message; ?></p>
<p>Song Request: <?php echo $songRequest; ?></p>

