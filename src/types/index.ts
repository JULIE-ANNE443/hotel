export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface Hotel {
  id: string;
  name: string;
  description: string;
  location: string;
  rating: number;
  imageUrl: string;
  amenities: string[];
  priceRange: string;
  ownerId: string;
}

export interface Product {
  id: string;
  hotelId: string;
  hotelName?: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  rating: number;
  imageUrl: string;
  category: 'room' | 'food' | 'service';
  createdAt: string;
}

export interface CartItem {
  id: string;
  userId: string;
  productId: string;
  product: Product;
  quantity: number;
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
  createdAt: string;
}