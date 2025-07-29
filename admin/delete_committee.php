<?php
// DB config for XAMPP (default: root, no password)
$servername = "localhost";
$username = "root";
$password = ""; // এখানে কিছু দিবেন না!
$dbname = "cse_club";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the ID from the POST request
$id = isset($_POST['id']) ? intval($_POST['id']) : 0;

if ($id > 0) {
    // Prepare and execute the deletion query
    $sql = "DELETE FROM committee WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        echo "Committee member deleted successfully!";
    } else {
        echo "Error deleting record: " . $conn->error;
    }

    $stmt->close();
} else {
    echo "Invalid ID provided.";
}

$conn->close();
?>