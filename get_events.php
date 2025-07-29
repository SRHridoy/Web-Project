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

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT title, date, time, location, description FROM events ORDER BY date, time";
$result = $conn->query($sql);

$events = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $events[] = $row;
    }
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($events);
?>