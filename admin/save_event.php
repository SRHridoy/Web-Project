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


// Get POST data
$title = isset($_POST['title']) ? $_POST['title'] : '';
$date = isset($_POST['date']) ? $_POST['date'] : '';
$time = isset($_POST['time']) ? $_POST['time'] : '';
$location = isset($_POST['location']) ? $_POST['location'] : '';
$description = isset($_POST['description']) ? $_POST['description'] : '';

// Validation
if (empty($title) || empty($date) || empty($time) || empty($location) || empty($description)) {
    echo "Error: All required fields must be filled!";
    $conn->close();
    exit();
}

// Insert to DB
$sql = "INSERT INTO events (title, date, time, location, description) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $title, $date, $time, $location, $description);

if ($stmt->execute()) {
    echo "Event saved successfully!";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>