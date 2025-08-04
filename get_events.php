<?php
// Show errors for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// DB config for XAMPP (default: root, no password)
$servername = "localhost";
$username = "root";
$password = ""; // No password for default XAMPP
$dbname = "cse_club";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Database connection failed']);
    exit();
}

// Fetch all event fields, including google_link if present in DB
$sql = "SELECT id, title, date, time, location, description, google_link FROM events ORDER BY date ASC, time ASC";
$result = $conn->query($sql);

$events = array();

if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $events[] = $row;
    }
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($events);
exit();
?>