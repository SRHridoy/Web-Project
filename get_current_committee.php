<?php
header('Content-Type: application/json');
$servername = "localhost";
$username = "root";
$password = ""; // XAMPP default
$dbname = "cse_club";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    echo json_encode([]);
    exit();
}

$sql = "SELECT id, name, position, description, contact, image FROM committee ORDER BY id DESC";
$result = $conn->query($sql);
$committee = [];
while ($row = $result->fetch_assoc()) {
    $committee[] = $row;
}
echo json_encode($committee);
$conn->close();
