<?php
$input = json_decode(file_get_contents('php://input'), true);
$conn = new mysqli('localhost', 'root', 'Keeththi1#', 'FlamesCalc');

$stmt = $conn->prepare("INSERT INTO Lovers (name, crushName, result) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $input['name1'], $input['name2'], $input['result']);
$stmt->execute();
echo json_encode(['status' => 'success']);
?>
