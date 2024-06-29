import axios from 'axios';
import {Order, OrderItem} from '../types/types';
import {BASE_URL} from '../lib/api';

// Create order function
export const createOrder = async (
  userId: number,
  restaurantId: number,
  deliveryAddress: string,
  cartItems: OrderItem[],
  total: number,
): Promise<Order> => {
  try {
    const response = await axios.post(`${BASE_URL}/api/orders`, {
      userId,
      restaurantId,
      deliveryAddress,
      cartItems,
      total,
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Request made and server responded
      console.error('Error creating order:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
      throw new Error(
        `Error creating order: ${
          error.response.data.message || error.response.data
        }`,
      );
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error creating order: No response received');
      console.error('Request:', error.request);
      throw new Error('Error creating order: No response received from server');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error creating order:', error.message);
      throw new Error(`Error creating order: ${error.message}`);
    }
  }
};

// Fetch order details
export const fetchOrderDetails = async (
  orderId: number,
): Promise<(Order & {error: null}) | {error: string}> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/orders/${orderId}`);
    return {...response.data, error: null};
  } catch (error: any) {
    console.error('Error fetching order details:', error);
    return {error: error.message};
  }
};

// Fetch orders
export const fetchOrders = async (): Promise<Order[]> => {
  try {
    const response = await axios.get(`${BASE_URL}/api/orders`);
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Assign driver to order
export const assignDriverToOrder = async (
  orderId: number,
  driverId: number,
): Promise<Order> => {
  try {
    const response = await axios.post(`${BASE_URL}/api/orders/assign-driver`, {
      orderId,
      driverId,
    });
    return response.data;
  } catch (error: any) {
    if (error.response) {
      // Request made and server responded
      console.error('Error assigning driver to order:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
      throw new Error(
        `Error assigning driver to order: ${
          error.response.data.message || error.response.data
        }`,
      );
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error assigning driver to order: No response received');
      console.error('Request:', error.request);
      throw new Error(
        'Error assigning driver to order: No response received from server',
      );
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error assigning driver to order:', error.message);
      throw new Error(`Error assigning driver to order: ${error.message}`);
    }
  }
};
