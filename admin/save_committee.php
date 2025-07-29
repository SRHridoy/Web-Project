<?php
// Show errors for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// DB config for XAMPP (default: root, no password)
$servername = "localhost";
$username = "root";
$password = ""; // এখানে কিছু দিবেন না!
$dbname = "cse_club";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get POST data
$name = isset($_POST['name']) ? $_POST['name'] : '';
$position = isset($_POST['position']) ? $_POST['position'] : '';
$description = isset($_POST['description']) ? $_POST['description'] : '';
$contact = isset($_POST['contact']) ? $_POST['contact'] : '';

// Validation
if (empty($name) || empty($position) || empty($description) || empty($contact)) {
    echo "Error: All required fields must be filled!";
    $conn->close();
    exit();
}

// Insert to DB
$sql = "INSERT INTO committee (name, position, description, contact) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssss", $name, $position, $description, $contact);

if ($stmt->execute()) {
    echo "Committee member saved successfully!";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
