<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $from = htmlspecialchars($_POST['from']);
    $to = htmlspecialchars($_POST['name']);
    $djs = htmlspecialchars($_POST['djs']);
    $message = htmlspecialchars($_POST['message']);
    $songrequest = htmlspecialchars($_POST['songrequest']);

    $data = "From: $from, To: $to, DJ: $djs, Message: $message, Song Request: $songrequest\n";
    file_put_contents('jaystest/requests.txt', $data, FILE_APPEND);

    header('Location: jaystest/success.html');
    exit();
} else {
    echo "Invalid request method.";
}
?>
