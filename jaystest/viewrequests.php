<!DOCTYPE HTML>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View Requests</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css">
</head>
<body>
    <h1>Song Requests and Dedications</h1>
    <ul>
        <?php
        if (file_exists('requests.txt')) {
            $requests = file('jaystest/requests.txt', FILE_IGNORE_NEW_LINES);
            foreach ($requests as $request) {
                echo "<li>$request</li>";
            }
        } else {
            echo "<li>No requests found.</li>";
        }
        ?>
    </ul>
</body>
</html>
