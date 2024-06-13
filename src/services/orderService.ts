import axios from 'axios';

// Create order function
export const createOrder = async (userId, restaurantId, deliveryAddress, cartItems, total) => {
  try {
    const response = await axios.post('http://192.168.1.224:3000/api/orders', {
      userId,
      restaurantId,
      deliveryAddress,
      cartItems,
      total,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};

// Fetch order details
export const fetchOrderDetails = async (orderId) => {
  try {
    const response = await axios.get(`http://192.168.1.224:3000/api/orders/${orderId}`);
    return { ...response.data, error: null };
  } catch (error) {
    console.error('Error fetching order details:', error);
    return { error: error.message };
  }
};

// Fetch orders
export const fetchOrders = async () => {
  try {
    const response = await axios.get(`http://192.168.1.224:3000/api/orders`);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Assign driver to order
export const assignDriverToOrder = async (orderId, driverId) => {
  try {
    const response = await axios.post(`http://192.168.1.224:3000/api/orders/assign-driver`, {
      orderId,
      driverId,
    });
    return response.data;
  } catch (error) {
    console.error('Error assigning driver to order:', error);
    throw error;
  }
};