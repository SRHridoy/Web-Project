<?php
// DB config for XAMPP (default: root, no password)
$servername = "localhost";
$username = "root";
$password = ""; // এখানে কিছু দিবেন না!
$dbname = "cse_club";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Database connection failed: ' . $conn->connect_error]);
    exit;
}

// Prepare and execute query
$sql = "SELECT * FROM committee ORDER BY id DESC";
$result = $conn->query($sql);

$committee = array();

if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $committee[] = $row;
    }
} elseif ($result === false) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Query failed: ' . $conn->error]);
    $conn->close();
    exit;
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($committee);
exit;
?>