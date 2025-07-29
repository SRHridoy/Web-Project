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
// created_at ফিল্ড থাকলে যুক্ত করতে পারেন, এখানে শুধু expiry_date আছে ধরে নিচ্ছি
$sql = "SELECT id, title, category, priority, expiry_date, content FROM notices ORDER BY id DESC";
$result = $conn->query($sql);
$notices = [];
while($row = $result->fetch_assoc()) {
    $notices[] = $row;
}
echo json_encode($notices);
$conn->close();
?>
