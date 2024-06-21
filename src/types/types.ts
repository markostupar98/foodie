// User.ts
export interface User {
  id: number;
  email: string;
  password: string;
  fullName: string;
  username: string;
  address: string;
  role: string;
  latitude?: number;
  longitude?: number;
  createdAt: Date;
  updatedAt: Date;
  orders: Order[];
  notificationToken?: string;
}

// Driver.ts
export interface Driver {
  id: number;
  fullName: string;
  email: string;
  password: string;
  vehicleType: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  orders: Order[];
  notificationToken?: string;
}

// Category.ts
export interface Category {
  id: number;
  name: string;
  image: string;
  restaurants: Restaurants[];
}

// Dish.ts
export interface Dish {
  id: number;
  name: string;
  price: number;
  image: string;
  restaurantId: number;
  restaurant: Restaurants;
  categoryId: number;
  orderItems: OrderItem[];
}

// Restaurants.ts
export interface Restaurants {
  id: number;
  name: string;
  address: string;
  image: string;
  dishes: Dish[];
  orders: Order[];
  categoryId: number;
  categoryName: Category;
  latitude?: number;
  longitude?: number;
}

// OrderItem.ts
export interface OrderItem {
  id: number;
  quantity: number;
  price: number;
  dishId: number;
  dish: Dish;
  orderId: number;
  order: Order;
}

// Order.ts
export interface Order {
  id: number;
  status: string;
  total: number;
  userId: number;
  user: User;
  restaurantId: number;
  restaurant: Restaurants;
  driverId?: number;
  driver?: Driver;
  deliveryAddress: string;
  orderItems: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}
