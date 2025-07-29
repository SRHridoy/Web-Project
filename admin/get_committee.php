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

$sql = "SELECT * FROM committee ORDER BY id DESC";
$result = $conn->query($sql);

$committee = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $committee[] = $row;
    }
}

$conn->close();

header('Content-Type: application/json');
echo json_encode($committee);
?>