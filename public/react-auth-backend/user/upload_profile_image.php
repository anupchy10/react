<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../config/config.php';

function sendResponse($success, $message, $data = null) {
    echo json_encode(['success' => $success, 'message' => $message, 'data' => $data]);
    exit;
}

$headers = apache_request_headers();
$authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';
if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
    sendResponse(false, 'Authorization token required');
}

$token = $matches[1];
$decoded = json_decode(base64_decode($token), true);
if (!$decoded || !isset($decoded['userId']) || $decoded['exp'] < time()) {
    sendResponse(false, 'Invalid or expired token');
}

$userId = $decoded['userId'];

if (!isset($_FILES['profile_image'])) {
    sendResponse(false, 'No image uploaded');
}

$file = $_FILES['profile_image'];
$allowedTypes = ['image/jpeg', 'image/png'];
$maxSize = 2 * 1024 * 1024; // 2MB

if (!in_array($file['type'], $allowedTypes)) {
    sendResponse(false, 'Invalid file type. Only JPEG and PNG are allowed');
}

if ($file['size'] > $maxSize) {
    sendResponse(false, 'File size exceeds 2MB limit');
}

$uploadDir = 'uploads/images/';
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$fileName = 'user_' . $userId . '_' . time() . '.' . pathinfo($file['name'], PATHINFO_EXTENSION);
$uploadPath = $uploadDir . $fileName;

try {
    if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
        // Update database
        $stmt = $conn->prepare("UPDATE users SET profile_image = :profile_image WHERE id = :id");
        $stmt->bindParam(':profile_image', $uploadPath);
        $stmt->bindParam(':id', $userId);
        $stmt->execute();

        // Fetch updated user data
        $stmt = $conn->prepare("SELECT id, first_name, middle_name, last_name, email, phone, address, city, state, postcode, date_of_birth, national_id, gender, profile_image FROM users WHERE id = :id");
        $stmt->bindParam(':id', $userId);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        sendResponse(true, 'Image uploaded successfully', [
            'id' => $user['id'],
            'firstName' => $user['first_name'],
            'middleName' => $user['middle_name'],
            'lastName' => $user['last_name'],
            'email' => $user['email'],
            'phone' => $user['phone'],
            'address' => $user['address'],
            'city' => $user['city'],
            'state' => $user['state'],
            'postcode' => $user['postcode'],
            'dateOfBirth' => $user['date_of_birth'],
            'nationalId' => $user['national_id'],
            'gender' => $user['gender'],
            'profileImage' => $user['profile_image'] ? 'http://localhost/react-auth-backend/' . $user['profile_image'] : null
        ]);
    } else {
        sendResponse(false, 'Failed to move uploaded file');
    }
} catch(PDOException $e) {
    sendResponse(false, 'Database error: ' . $e->getMessage());
}
?>