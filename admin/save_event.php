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
    die("Connection failed: " . $conn->connect_error);
}

// Get POST data and sanitize
$title = isset($_POST['title']) ? trim($_POST['title']) : '';
$date = isset($_POST['date']) ? trim($_POST['date']) : '';
$time = isset($_POST['time']) ? trim($_POST['time']) : '';
$location = isset($_POST['location']) ? trim($_POST['location']) : '';
$description = isset($_POST['description']) ? trim($_POST['description']) : '';
$google_link = isset($_POST['google_link']) ? trim($_POST['google_link']) : '';

// Validation for required fields
if (empty($title) || empty($date) || empty($time) || empty($location) || empty($description)) {
    echo "Error: All required fields must be filled!";
    $conn->close();
    exit();
}

// Optional: Validate google_link if provided
if (!empty($google_link) && !filter_var($google_link, FILTER_VALIDATE_URL)) {
    echo "Error: Invalid Google link URL!";
    $conn->close();
    exit();
}

// Prepare and execute insert statement
$sql = "INSERT INTO events (title, date, time, location, description, google_link) VALUES (?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo "Error: " . $conn->error;
    $conn->close();
    exit();
}

$stmt->bind_param("ssssss", $title, $date, $time, $location, $description, $google_link);

if ($stmt->execute()) {
    echo "Event saved successfully!";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>