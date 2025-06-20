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

// Log function for debugging
function logError($message) {
    file_put_contents(
        __DIR__ . '/debug.log',
        date('Y-m-d H:i:s') . ' - ' . $message . PHP_EOL,
        FILE_APPEND
    );
}

// Validate authorization token
$headers = apache_request_headers();
$authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';
if (!$authHeader || !preg_match('/Bearer\s(\S+)/', $authHeader, $matches)) {
    logError('Authorization header missing or invalid: ' . json_encode($headers));
    sendResponse(false, 'Authorization token required');
}

$token = $matches[1];
// Log the raw token for debugging
logError('Received token: ' . $token);

// Split JWT into parts
$tokenParts = explode('.', $token);
if (count($tokenParts) !== 3) {
    logError('Invalid token format, parts count: ' . count($tokenParts));
    sendResponse(false, 'Invalid token format');
}

// Decode payload
$payload = base64_decode(str_replace(['-', '_'], ['+', '/'], $tokenParts[1]));
if ($payload === false) {
    logError('Failed to decode payload: ' . $tokenParts[1]);
    sendResponse(false, 'Invalid token payload encoding');
}

$decodedPayload = json_decode($payload, true);
if (!$decodedPayload || !isset($decodedPayload['userId']) || !isset($decodedPayload['exp'])) {
    logError('Invalid payload structure: ' . json_encode($decodedPayload));
    sendResponse(false, 'Invalid or missing userId/exp in token');
}

if ($decodedPayload['exp'] < time()) {
    logError('Token expired: exp=' . $decodedPayload['exp'] . ', current=' . time());
    sendResponse(false, 'Token expired');
}

// Verify signature
$header = $tokenParts[0];
$payloadPart = $tokenParts[1];
$signature = $tokenParts[2];
$expectedSignature = str_replace(['+', '/', '='], ['-', '_', ''], base64_encode(hash_hmac('sha256', "$header.$payloadPart", JWT_SECRET, true)));
if ($signature !== $expectedSignature) {
    logError('Invalid signature. Expected: ' . $expectedSignature . ', Received: ' . $signature);
    sendResponse(false, 'Invalid token signature');
}

$userId = $decodedPayload['userId'];
logError('Validated userId: ' . $userId);

// Fetch username and phone from database
try {
    $stmt = $conn->prepare("SELECT username, phone FROM users WHERE id = :id");
    $stmt->bindParam(':id', $userId);
    $stmt->execute();
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user) {
        logError('User not found for ID: ' . $userId);
        sendResponse(false, 'User not found');
    }
    
    $username = $user['username'];
    $phone = $user['phone'] ?? '';
} catch(PDOException $e) {
    logError('Database error fetching user: ' . $e->getMessage());
    sendResponse(false, 'Database error: ' . $e->getMessage());
}

// Validate uploaded file
if (!isset($_FILES['profile_image']) || $_FILES['profile_image']['error'] === UPLOAD_ERR_NO_FILE) {
    logError('No image uploaded');
    sendResponse(false, 'No image uploaded');
}

$file = $_FILES['profile_image'];
$allowedTypes = ['image/jpeg', 'image/png'];
$maxSize = 10 * 1024 * 1024; // 10MB

if (!in_array($file['type'], $allowedTypes)) {
    logError('Invalid file type: ' . $file['type']);
    sendResponse(false, 'Invalid file type. Only JPEG and PNG are allowed');
}

if ($file['size'] > $maxSize) {
    logError('File size exceeds limit: ' . $file['size']);
    sendResponse(false, 'File size exceeds 10MB limit');
}

if ($file['error'] !== UPLOAD_ERR_OK) {
    logError('File upload error code: ' . $file['error']);
    sendResponse(false, 'File upload error: ' . $file['error']);
}

// Create upload directory if it doesn't exist
$uploadDir = 'user_upload/';
if (!is_dir($uploadDir)) {
    if (!mkdir($uploadDir, 0755, true)) {
        logError('Failed to create upload directory: ' . $uploadDir);
        sendResponse(false, 'Failed to create upload directory');
    }
}

// Generate filename with user ID, username, upload date, and phone
$uploadDate = date('Ymd_His');
$phoneCleaned = preg_replace('/[^0-9]/', '', $phone);
$fileExtension = pathinfo($file['name'], PATHINFO_EXTENSION);
$fileName = "user_{$userId}_{$username}_{$uploadDate}_{$phoneCleaned}.{$fileExtension}";
$uploadPath = $uploadDir . $fileName;

try {
    if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
        // Update database with new profile image path
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
            'profileImage' => $user['profile_image'] ? 'http://localhost/react-auth-backend/user/' . $user['profile_image'] : null
        ]);
    } else {
        logError('Failed to move uploaded file to: ' . $uploadPath);
        sendResponse(false, 'Failed to move uploaded file');
    }
} catch(PDOException $e) {
    logError('Database error updating user: ' . $e->getMessage());
    sendResponse(false, 'Database error: ' . $e->getMessage());
}
?>