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
$title = isset($_POST['title']) ? $_POST['title'] : '';
$category = isset($_POST['category']) ? $_POST['category'] : '';
$priority = isset($_POST['priority']) ? $_POST['priority'] : '';
$expiry_date = isset($_POST['expiry_date']) ? $_POST['expiry_date'] : null;
$content = isset($_POST['content']) ? $_POST['content'] : '';

// Validation
if (empty($title) || empty($category) || empty($priority) || empty($content)) {
    echo "Error: All required fields must be filled!";
    $conn->close();
    exit();
}

// Insert to DB
$sql = "INSERT INTO notices (title, category, priority, expiry_date, content) VALUES (?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("sssss", $title, $category, $priority, $expiry_date, $content);

if ($stmt->execute()) {
    echo "Notice saved successfully!";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
