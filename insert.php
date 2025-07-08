<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['name1'], $input['name2'], $input['result'])) {
    echo json_encode(['status' => 'error', 'message' => 'Missing data']);
    exit;
}

// $conn = new mysqli('sql111.infinityfree.com', 'if0_39424736', 'DJpnpYA8oDe', 'if0_39424736_flamescalc');
$conn = new mysqli('localhost', 'root', 'Keeththi1#', 'FlamesCalc');


if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'DB connection failed']);
    exit;
}

$stmt = $conn->prepare("INSERT INTO Lovers (name, crushName, result) VALUES (?, ?, ?)");
if (!$stmt) {
    echo json_encode(['status' => 'error', 'message' => 'Query preparation failed']);
    exit;
}

$stmt->bind_param("sss", $input['name1'], $input['name2'], $input['result']);
$stmt->execute();

echo json_encode(['status' => 'success']);
?>
