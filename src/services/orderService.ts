import axios from 'axios';

// Create order function
import {Order, OrderItem} from '../types/types';

// Create order function
export const createOrder = async (
  userId: number,
  restaurantId: number,
  deliveryAddress: string,
  cartItems: OrderItem[],
  total: number,
): Promise<Order> => {
  try {
    const response = await axios.post('http://10.0.2.2:3000/api/orders', {
      userId,
      restaurantId,
      deliveryAddress,
      cartItems,
      total,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Fetch order details
export const fetchOrderDetails = async (
  orderId: number,
): Promise<(Order & {error: null}) | {error: string}> => {
  try {
    const response = await axios.get(
      `http://10.0.2.2:3000/api/orders/${orderId}`,
    );
    return {...response.data, error: null};
  } catch (error: any) {
    console.error('Error fetching order details:', error);
    return {error: error.message};
  }
};

// Fetch orders
export const fetchOrders = async (): Promise<Order[]> => {
  try {
    const response = await axios.get(`http://10.0.2.2:3000/api/orders`);
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
    const response = await axios.post(
      `http://10.0.2.2:3000/api/orders/assign-driver`,
      {
        orderId,
        driverId,
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error assigning driver to order:', error);
    throw error;
  }
};
