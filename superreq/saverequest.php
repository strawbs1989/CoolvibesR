<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $requestData = json_decode(file_get_contents('php://input'), true);

    $existingData = file_get_contents('/superreq/requests.json');
    $requests = json_decode($existingData, true);

    $requests[] = $requestData;

    file_put_contents('requests.json', json_encode($requests));
}
?>
