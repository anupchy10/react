<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Handle CORS preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../config/config.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = isset($_GET['action']) ? $_GET['action'] : 'list';

switch ($method) {
    case 'GET':
        handleGetRequest($action);
        break;
    case 'PUT':
        handlePutRequest($action);
        break;
    case 'DELETE':
        handleDeleteRequest($action);
        break;
    default:
        sendResponse(false, 'Method not allowed');
}

function handleGetRequest($action) {
    switch ($action) {
        case 'list':
            getUserOrderHistory();
            break;
        case 'details':
            getOrderDetails();
            break;
        case 'stats':
            getOrderStats();
            break;
        default:
            getUserOrderHistory();
    }
}

function handlePutRequest($action) {
    switch ($action) {
        case 'status':
            updateOrderStatus();
            break;
        default:
            sendResponse(false, 'Invalid action for PUT request');
    }
}

function handleDeleteRequest($action) {
    switch ($action) {
        case 'cancel':
            cancelOrder();
            break;
        default:
            sendResponse(false, 'Invalid action for DELETE request');
    }
}

function getUserOrderHistory() {
    global $conn;

    $userId = isset($_GET['userId']) ? trim($_GET['userId']) : null;
    $limit = isset($_GET['limit']) ? intval($_GET['limit']) : 50;
    $offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;
    $status = isset($_GET['status']) ? trim($_GET['status']) : null;

    if (!$userId) {
        sendResponse(false, 'User ID is required');
    }

    try {
        // Get user email for tracking
        $stmt = $conn->prepare("SELECT id, email FROM users WHERE id = :userId");
        $stmt->bindParam(':userId', $userId);
        $stmt->execute();
        $user = $stmt->fetch();

        if (!$user) {
            sendResponse(false, 'User not found', [], 404);
        }

        // First try to get from permanent history table
        $historyOrders = getOrdersFromHistory($userId, $limit, $offset, $status);
        
        if (!empty($historyOrders)) {
            sendResponse(true, 'Order history retrieved from permanent storage', [
                'orders' => $historyOrders,
                'totalOrders' => count($historyOrders),
                'user_login_email' => $user['email'],
                'from_permanent_storage' => true,
                'pagination' => [
                    'limit' => $limit,
                    'offset' => $offset,
                    'hasMore' => count($historyOrders) >= $limit
                ]
            ]);
            return;
        }

        // Fallback to original tables if history table is empty
        $allOrders = [];

        // Get orders from all payment tables
        $tables = [
            'paymentondelivery' => 'paymentondelivery',
            'onlinepayment' => 'onlinepayment', 
            'creditcardpayment' => 'creditcardpayment'
        ];

        foreach ($tables as $table => $paymentMethod) {
            $query = "SELECT *, '$table' as table_source FROM $table WHERE user_id = :userId";
            
            if ($status) {
                if ($table === 'paymentondelivery') {
                    $query .= " AND COALESCE(order_status, 'pending') = :status";
                } else {
                    $query .= " AND payment_status = :status";
                }
            }
            
            $query .= " ORDER BY order_date DESC LIMIT :limit OFFSET :offset";
            
            $stmt = $conn->prepare($query);
            $stmt->bindParam(':userId', $userId);
            if ($status) {
                $stmt->bindParam(':status', $status);
            }
            $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
            $stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
            $stmt->execute();
            
            $orders = $stmt->fetchAll();
            $allOrders = array_merge($allOrders, $orders);
        }

        // Sort by order_date descending
        usort($allOrders, function($a, $b) {
            return strtotime($b['order_date']) - strtotime($a['order_date']);
        });

        // Process orders and save to permanent history
        foreach ($allOrders as &$order) {
            // Add missing user_id if not present
            if (!isset($order['user_id'])) {
                $order['user_id'] = $userId;
            }
            
            $order['products'] = json_decode($order['products'], true);
            $order['item_count'] = count($order['products']);
            $order['can_cancel'] = canCancelOrder($order['order_status'] ?? $order['payment_status'] ?? 'pending', $order['order_date']);
            $order['formatted_date'] = date('M d, Y h:i A', strtotime($order['order_date']));
            $order['user_login_email'] = $user['email']; // Add login email
            $order['is_permanent'] = false;

            // Set order status
            if ($order['table_source'] === 'paymentondelivery') {
                $order['order_status'] = $order['order_status'] ?? 'pending';
            } else {
                $order['order_status'] = $order['payment_status'] ?? 'pending';
            }

            // Save to permanent history table with user email
            saveToHistory($order, $user['email']);
        }

        sendResponse(true, 'Order history retrieved successfully', [
            'orders' => $allOrders,
            'totalOrders' => count($allOrders),
            'user_login_email' => $user['email'],
            'from_permanent_storage' => false,
            'pagination' => [
                'limit' => $limit,
                'offset' => $offset,
                'hasMore' => count($allOrders) >= $limit
            ]
        ]);

    } catch(PDOException $e) {
        sendResponse(false, 'Database error: ' . $e->getMessage(), [], 500);
    }
}

function getOrderDetails() {
    global $conn;

    $transactionId = isset($_GET['transactionId']) ? trim($_GET['transactionId']) : null;
    $userId = isset($_GET['userId']) ? trim($_GET['userId']) : null;

    if (!$transactionId || !$userId) {
        sendResponse(false, 'Transaction ID and User ID are required');
    }

    try {
        // First check history table
        $stmt = $conn->prepare("SELECT * FROM order_history WHERE transaction_id = :transactionId AND user_id = :userId AND is_deleted = 0");
        $stmt->bindParam(':transactionId', $transactionId);
        $stmt->bindParam(':userId', $userId);
        $stmt->execute();
        $order = $stmt->fetch();

        if ($order) {
            $order['products'] = json_decode($order['products'], true);
            $order['item_count'] = count($order['products']);
            $order['can_cancel'] = canCancelOrder($order['order_status'], $order['order_date']);
            $order['formatted_date'] = date('M d, Y h:i A', strtotime($order['order_date']));
            $order['user_login_email'] = $order['user_email'];
            $order['is_permanent'] = true;

            sendResponse(true, 'Order details retrieved from permanent storage', [
                'order' => $order
            ]);
            return;
        }

        // Fallback to original tables
        $tables = ['paymentondelivery', 'onlinepayment', 'creditcardpayment'];
        foreach ($tables as $table) {
            $stmt = $conn->prepare("SELECT *, '$table' as table_source FROM $table WHERE transaction_id = :transactionId AND user_id = :userId");
            $stmt->bindParam(':transactionId', $transactionId);
            $stmt->bindParam(':userId', $userId);
            $stmt->execute();
            $order = $stmt->fetch();

            if ($order) {
                $order['products'] = json_decode($order['products'], true);
                $order['item_count'] = count($order['products']);
                $order['order_status'] = $order['order_status'] ?? $order['payment_status'] ?? 'pending';
                $order['can_cancel'] = canCancelOrder($order['order_status'], $order['order_date']);
                $order['formatted_date'] = date('M d, Y h:i A', strtotime($order['order_date']));
                $order['is_permanent'] = false;

                sendResponse(true, 'Order details retrieved successfully', [
                    'order' => $order
                ]);
                return;
            }
        }

        sendResponse(false, 'Order not found', [], 404);

    } catch(PDOException $e) {
        sendResponse(false, 'Database error: ' . $e->getMessage(), [], 500);
    }
}

function getOrderStats() {
    global $conn;
    
    $userId = isset($_GET['userId']) ? trim($_GET['userId']) : null;
    
    if (!$userId) {
        sendResponse(false, 'User ID is required');
    }
    
    try {
        // Get overall statistics from history table
        $stmt = $conn->prepare("
            SELECT 
                COUNT(*) as total_orders,
                COUNT(DISTINCT user_email) as unique_emails,
                COUNT(CASE WHEN order_status = 'pending' THEN 1 END) as pending_orders,
                COUNT(CASE WHEN order_status = 'processing' THEN 1 END) as processing_orders,
                COUNT(CASE WHEN order_status = 'shipped' THEN 1 END) as shipped_orders,
                COUNT(CASE WHEN order_status = 'delivered' THEN 1 END) as delivered_orders,
                COUNT(CASE WHEN order_status = 'cancelled' THEN 1 END) as cancelled_orders,
                COALESCE(SUM(payment_amount), 0) as total_revenue,
                COALESCE(AVG(payment_amount), 0) as average_order_value
            FROM order_history 
            WHERE user_id = :user_id AND is_deleted = 0
        ");
        $stmt->bindParam(':user_id', $userId);
        $stmt->execute();
        $overallStats = $stmt->fetch();
        
        // Get email breakdown
        $stmt = $conn->prepare("
            SELECT 
                user_email,
                COUNT(*) as order_count,
                COALESCE(SUM(payment_amount), 0) as total_spent,
                MAX(order_date) as last_order_date
            FROM order_history 
            WHERE user_id = :user_id AND is_deleted = 0
            GROUP BY user_email
            ORDER BY order_count DESC
            LIMIT 10
        ");
        $stmt->bindParam(':user_id', $userId);
        $stmt->execute();
        $emailBreakdown = $stmt->fetchAll();
        
        sendResponse(true, 'Order statistics retrieved successfully', [
            'overall_stats' => $overallStats,
            'email_breakdown' => $emailBreakdown,
            'data_permanency' => [
                'is_permanent' => true,
                'backup_enabled' => true,
                'soft_delete_protection' => true
            ]
        ]);
        
    } catch(PDOException $e) {
        sendResponse(false, 'Database error: ' . $e->getMessage(), [], 500);
    }
}

function updateOrderStatus() {
    global $conn;

    $input = json_decode(file_get_contents('php://input'), true);

    $transactionId = isset($input['transactionId']) ? trim($input['transactionId']) : null;
    $userId = isset($input['userId']) ? trim($input['userId']) : null;
    $newStatus = isset($input['status']) ? trim($input['status']) : null;

    if (!$transactionId || !$userId || !$newStatus) {
        sendResponse(false, 'Transaction ID, User ID, and status are required');
    }

    $validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!in_array($newStatus, $validStatuses)) {
        sendResponse(false, 'Invalid status. Valid statuses: ' . implode(', ', $validStatuses));
    }

    try {
        $conn->beginTransaction();

        // Update in history table
        $stmt = $conn->prepare("UPDATE order_history SET order_status = :status WHERE transaction_id = :transactionId AND user_id = :userId");
        $stmt->bindParam(':status', $newStatus);
        $stmt->bindParam(':transactionId', $transactionId);
        $stmt->bindParam(':userId', $userId);
        $stmt->execute();

        $conn->commit();
        sendResponse(true, 'Order status updated successfully', [
            'transactionId' => $transactionId,
            'newStatus' => $newStatus
        ]);

    } catch(PDOException $e) {
        $conn->rollBack();
        sendResponse(false, 'Database error: ' . $e->getMessage(), [], 500);
    }
}

function cancelOrder() {
    global $conn;

    $transactionId = isset($_GET['transactionId']) ? trim($_GET['transactionId']) : null;
    $userId = isset($_GET['userId']) ? trim($_GET['userId']) : null;

    if (!$transactionId || !$userId) {
        sendResponse(false, 'Transaction ID and User ID are required');
    }

    try {
        $conn->beginTransaction();

        // Update status to cancelled in history table
        $stmt = $conn->prepare("UPDATE order_history SET order_status = 'cancelled' WHERE transaction_id = :transactionId AND user_id = :userId");
        $stmt->bindParam(':transactionId', $transactionId);
        $stmt->bindParam(':userId', $userId);
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $conn->commit();
            sendResponse(true, 'Order cancelled successfully', [
                'transactionId' => $transactionId,
                'status' => 'cancelled'
            ]);
        } else {
            $conn->rollBack();
            sendResponse(false, 'Order not found or already cancelled', [], 404);
        }

    } catch(PDOException $e) {
        $conn->rollBack();
        sendResponse(false, 'Database error: ' . $e->getMessage(), [], 500);
    }
}

function canCancelOrder($status, $orderDate) {
    $cancellableStatuses = ['pending', 'processing'];

    if (in_array($status, $cancellableStatuses)) {
        return true;
    }

    $orderTime = strtotime($orderDate);
    $currentTime = time();
    $hoursDiff = ($currentTime - $orderTime) / 3600;

    return $hoursDiff <= 24 && !in_array($status, ['delivered', 'cancelled']);
}

/**
 * Get orders from permanent history table
 */
function getOrdersFromHistory($userId, $limit = 50, $offset = 0, $status = null) {
    global $conn;
    
    try {
        $whereClause = "WHERE user_id = :userId AND is_deleted = 0";
        $params = [':userId' => $userId];
        
        if ($status) {
            $whereClause .= " AND order_status = :status";
            $params[':status'] = $status;
        }
        
        $query = "SELECT * FROM order_history $whereClause ORDER BY order_date DESC LIMIT :limit OFFSET :offset";
        
        $stmt = $conn->prepare($query);
        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }
        $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
        $stmt->execute();
        
        $orders = $stmt->fetchAll();
        
        // Process orders
        foreach ($orders as &$order) {
            $order['products'] = json_decode($order['products'], true);
            $order['item_count'] = count($order['products']);
            $order['formatted_date'] = date('M d, Y h:i A', strtotime($order['order_date']));
            $order['user_login_email'] = $order['user_email']; // Email when user logged in
            $order['is_permanent'] = true;
            $order['can_cancel'] = canCancelOrder($order['order_status'], $order['order_date']);
        }
        
        return $orders;
        
    } catch(PDOException $e) {
        return [];
    }
}

/**
 * Save order to permanent history with user login email
 */
function saveToHistory($orderData, $userLoginEmail) {
    global $conn;
    
    try {
        // Check if already exists
        $checkStmt = $conn->prepare("SELECT id FROM order_history WHERE transaction_id = :txn");
        $checkStmt->execute([':txn' => $orderData['transaction_id']]);
        
        if ($checkStmt->fetch()) {
            return true; // Already saved
        }
        
        // Save to history table with user email
        $stmt = $conn->prepare("
            INSERT INTO order_history (
                user_id, user_email, customer_name, phone, country, city, address,
                products, transaction_id, payment_method, payment_amount, product_amount,
                delivery_charge, discount, applied_promo, order_date, order_status, is_deleted
            ) VALUES (
                :user_id, :user_email, :customer_name, :phone, :country, :city, :address,
                :products, :transaction_id, :payment_method, :payment_amount, :product_amount,
                :delivery_charge, :discount, :applied_promo, :order_date, :order_status, 0
            )
        ");
        
        return $stmt->execute([
            ':user_id' => $orderData['user_id'],
            ':user_email' => $userLoginEmail, // Store login email
            ':customer_name' => $orderData['customer_name'],
            ':phone' => $orderData['phone'],
            ':country' => $orderData['country'],
            ':city' => $orderData['city'],
            ':address' => $orderData['address'],
            ':products' => is_array($orderData['products']) ? json_encode($orderData['products']) : $orderData['products'],
            ':transaction_id' => $orderData['transaction_id'],
            ':payment_method' => $orderData['table_source'] ?? 'unknown',
            ':payment_amount' => $orderData['payment_amount'],
            ':product_amount' => $orderData['product_amount'],
            ':delivery_charge' => $orderData['delivery_charge'],
            ':discount' => $orderData['discount'],
            ':applied_promo' => $orderData['applied_promo'] ?? null,
            ':order_date' => $orderData['order_date'],
            ':order_status' => $orderData['order_status'] ?? 'pending'
        ]);
        
    } catch(PDOException $e) {
        return false;
    }
}
?>