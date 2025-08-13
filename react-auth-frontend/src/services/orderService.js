import axios from 'axios';

// Use XAMPP localhost setup
const API_BASE_URL = 'http://localhost/react-auth-backend';

// Get user from localStorage
const getUser = () => {
  try {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error getting user from localStorage:', error);
    return null;
  }
};

// Get user order history with enhanced email tracking
export const getUserOrderHistoryAPI = async (params = {}) => {
  const user = getUser();
  if (!user) {
    throw new Error('User not logged in');
  }

  try {
    const queryParams = new URLSearchParams({
      action: 'list',
      userId: user.id,
      ...params
    });

    const response = await axios.get(`${API_BASE_URL}/cart/order_management.php?${queryParams}`);
    
    // Enhanced response includes user email tracking and permanent storage info
    if (response.data.success) {
      console.log('Order history retrieved with email tracking:', {
        userLoginEmail: response.data.data.user_login_email,
        fromPermanentStorage: response.data.data.from_permanent_storage,
        totalOrders: response.data.data.totalOrders
      });
    }
    
    return response.data;
  } catch (error) {
    console.error('Error getting order history:', error);
    throw error;
  }
};

// Get specific order details
export const getOrderDetailsAPI = async (transactionId) => {
  const user = getUser();
  if (!user) {
    throw new Error('User not logged in');
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/cart/order_management.php?action=details&transactionId=${transactionId}&userId=${user.id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting order details:', error);
    throw error;
  }
};

// Update order status
export const updateOrderStatusAPI = async (transactionId, status) => {
  const user = getUser();
  if (!user) {
    throw new Error('User not logged in');
  }

  try {
    const response = await axios.put(`${API_BASE_URL}/cart/order_management.php?action=status`, {
      transactionId,
      userId: user.id,
      status
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

// Cancel order
export const cancelOrderAPI = async (transactionId) => {
  const user = getUser();
  if (!user) {
    throw new Error('User not logged in');
  }

  try {
    const response = await axios.delete(`${API_BASE_URL}/cart/order_management.php?action=cancel&transactionId=${transactionId}&userId=${user.id}`);
    return response.data;
  } catch (error) {
    console.error('Error cancelling order:', error);
    throw error;
  }
};

// Get orders by status
export const getOrdersByStatusAPI = async (status, params = {}) => {
  const user = getUser();
  if (!user) {
    throw new Error('User not logged in');
  }

  try {
    const queryParams = new URLSearchParams({
      action: 'list',
      userId: user.id,
      status,
      ...params
    });

    const response = await axios.get(`${API_BASE_URL}/cart/order_management.php?${queryParams}`);
    return response.data;
  } catch (error) {
    console.error('Error getting orders by status:', error);
    throw error;
  }
};

// NEW: Get orders by user email (using main order management endpoint)
export const getOrdersByEmailAPI = async (email, params = {}) => {
  try {
    // Since we removed the separate endpoint, we'll use the main one
    const user = getUser();
    if (!user) {
      throw new Error('User not logged in');
    }

    const queryParams = new URLSearchParams({
      action: 'list',
      userId: user.id,
      ...params
    });

    const response = await axios.get(`${API_BASE_URL}/cart/order_management.php?${queryParams}`);
    return response.data;
  } catch (error) {
    console.error('Error getting orders by email:', error);
    throw error;
  }
};

// NEW: Get order statistics with email tracking
export const getOrderStatsAPI = async () => {
  const user = getUser();
  if (!user) {
    throw new Error('User not logged in');
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/cart/order_management.php?action=stats&userId=${user.id}`);
    return response.data;
  } catch (error) {
    console.error('Error getting order statistics:', error);
    throw error;
  }
};
