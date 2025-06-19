<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle CORS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once 'config/config.php';
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    sendResponse(false, 'Invalid JSON data received');
}

$paymentMethod = isset($data['paymentMethod']) ? trim($data['paymentMethod']) : null;
$userId = isset($data['userId']) ? intval($data['userId']) : null;
$userName = isset($data['userName']) ? trim($data['userName']) : null;
$userEmail = isset($data['userEmail']) ? trim($data['userEmail']) : null;
$userPhone = isset($data['userPhone']) ? trim($data['userPhone']) : null;
$cartItems = isset($data['cartItems']) ? $data['cartItems'] : [];
$totalAmount = isset($data['totalAmount']) ? floatval($data['totalAmount']) : 0;
$deliveryCharge = isset($data['deliveryCharge']) ? floatval($data['deliveryCharge']) : 0;
$discount = isset($data['discount']) ? floatval($data['discount']) : 0;
$appliedPromo = isset($data['appliedPromo']) ? trim($data['appliedPromo']) : null;
$shippingAddress = isset($data['shippingAddress']) ? $data['shippingAddress'] : null;

try {
    if (!$paymentMethod || !$userId || empty($cartItems)) {
        sendResponse(false, 'Missing required payment data');
    }

    $conn->beginTransaction();

    if ($paymentMethod === 'payment on deliver') {
        
        // Insert into paymentondelivery table
        $stmt = $conn->prepare("
            INSERT INTO paymentondelivery (
                user_id, user_name, user_email, user_phone, 
                total_amount, delivery_charge, discount, applied_promo,
                country, city, address, status, created_at
            ) VALUES (
                :userId, :userName, :userEmail, :userPhone,
                :totalAmount, :deliveryCharge, :discount, :appliedPromo,
                :country, :city, :address, 'pending', NOW()
            )
        ");

        $stmt->bindParam(':userId', $userId);
        $stmt->bindParam(':userName', $userName);
        $stmt->bindParam(':userEmail', $userEmail);
        $stmt->bindParam(':userPhone', $userPhone);
        $stmt->bindParam(':totalAmount', $totalAmount);
        $stmt->bindParam(':deliveryCharge', $deliveryCharge);
        $stmt->bindParam(':discount', $discount);
        $stmt->bindParam(':appliedPromo', $appliedPromo);
        $stmt->bindParam(':country', $shippingAddress['country']);
        $stmt->bindParam(':city', $shippingAddress['city']);
        $stmt->bindParam(':address', $shippingAddress['address']);

        $stmt->execute();
        $paymentId = $conn->lastInsertId();

        // Insert cart items into paymentondelivery_items table
        foreach ($cartItems as $item) {
            $stmt = $conn->prepare("
                INSERT INTO paymentondelivery_items (
                    payment_id, product_id, product_name, product_image, 
                    quantity, price, total_price, selected
                ) VALUES (
                    :paymentId, :productId, :productName, :productImage,
                    :quantity, :price, :totalPrice, :selected
                )
            ");

            $totalPrice = $item['price'] * $item['quantity'];

            $stmt->bindParam(':paymentId', $paymentId);
            $stmt->bindParam(':productId', $item['_id']);
            $stmt->bindParam(':productName', $item['name']);
            $stmt->bindParam(':productImage', $item['image']);
            $stmt->bindParam(':quantity', $item['quantity']);
            $stmt->bindParam(':price', $item['price']);
            $stmt->bindParam(':totalPrice', $totalPrice);
            $stmt->bindParam(':selected', $item['selected'] ? 1 : 0);
            $stmt->execute();
        }

    } elseif ($paymentMethod === 'Online payment') {
        // Insert into onlinepayment table
        $transactionId = isset($data['transactionId']) ? $data['transactionId'] : 'TXN' . uniqid();
        $paymentProvider = isset($data['paymentProvider']) ? $data['paymentProvider'] : null;

        $stmt = $conn->prepare("
            INSERT INTO onlinepayment (
                user_id, user_name, user_email, user_phone, 
                transaction_id, payment_provider, total_amount, 
                delivery_charge, discount, applied_promo,
                country, city, address, status, created_at
            ) VALUES (
                :userId, :userName, :userEmail, :userPhone,
                :transactionId, :paymentProvider, :totalAmount,
                :deliveryCharge, :discount, :appliedPromo,
                :country, :city, :address, 'completed', NOW()
            )
        ");

        $stmt->bindParam(':userId', $userId);
        $stmt->bindParam(':userName', $userName);
        $stmt->bindParam(':userEmail', $userEmail);
        $stmt->bindParam(':userPhone', $userPhone);
        $stmt->bindParam(':transactionId', $transactionId);
        $stmt->bindParam(':paymentProvider', $paymentProvider);
        $stmt->bindParam(':totalAmount', $totalAmount);
        $stmt->bindParam(':deliveryCharge', $deliveryCharge);
        $stmt->bindParam(':discount', $discount);
        $stmt->bindParam(':appliedPromo', $appliedPromo);
        $stmt->bindParam(':country', $shippingAddress['country']);
        $stmt->bindParam(':city', $shippingAddress['city']);
        $stmt->bindParam(':address', $shippingAddress['address']);

        $stmt->execute();
        $paymentId = $conn->lastInsertId();

        // Insert cart items into onlinepayment_items table
        foreach ($cartItems as $item) {
            $stmt = $conn->prepare("
                INSERT INTO onlinepayment_items (
                    payment_id, product_id, product_name, product_image, 
                    quantity, price, total_price, selected
                ) VALUES (
                    :paymentId, :productId, :productName, :productImage,
                    :quantity, :price, :totalPrice, :selected
                )
            ");

            $totalPrice = $item['price'] * $item['quantity'];

            $stmt->bindParam(':paymentId', $paymentId);
            $stmt->bindParam(':productId', $item['_id']);
            $stmt->bindParam(':productName', $item['name']);
            $stmt->bindParam(':productImage', $item['image']);
            $stmt->bindParam(':quantity', $item['quantity']);
            $stmt->bindParam(':price', $item['price']);
            $stmt->bindParam(':totalPrice', $totalPrice);
            $stmt->bindParam(':selected', $item['selected'] ? 1 : 0);
            $stmt->execute();
        }
    } else {
        throw new Exception("Invalid payment method");
    }

    // Clear the user's cart after successful payment
    $stmt = $conn->prepare("DELETE FROM cart_items WHERE user_id = :userId");
    $stmt->bindParam(':userId', $userId);
    $stmt->execute();

    // Commit transaction
    $conn->commit();

    sendResponse(true, 'Payment processed successfully', [
        'paymentId' => $paymentId,
        'paymentMethod' => $paymentMethod
    ]);

} catch(PDOException $e) {
    $conn->rollBack();
    sendResponse(false, 'Database error: ' . $e->getMessage());
} catch(Exception $e) {
    $conn->rollBack();
    sendResponse(false, $e->getMessage());
}

function sendResponse($success, $message, $data = []) {
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'data' => $data
    ]);
    exit;
}
?>