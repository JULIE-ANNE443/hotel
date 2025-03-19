import React, { useState } from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

interface Product {
  id: string;
  hotelId: string;
  hotelName: string;
  name: string;
  description: string;
  price: number;
  rating: number;
  imageUrl: string;
  category: 'room' | 'food' | 'service';
}

const SAMPLE_PRODUCTS: Product[] = [
  // Serena Hotel Products
  {
    id: '1',
    hotelId: '1',
    hotelName: 'Serena Hotel Nairobi',
    name: 'Deluxe Room',
    description: 'Luxurious room with city view, king-size bed, and premium amenities',
    price: 25000,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    category: 'room'
  },
  {
    id: '2',
    hotelId: '1',
    hotelName: 'Serena Hotel Nairobi',
    name: 'Mandhari Restaurant - Fine Dining Experience',
    description: 'Five-course gourmet dinner with wine pairing',
    price: 12000,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    category: 'food'
  },
  {
    id: '3',
    hotelId: '1',
    hotelName: 'Serena Hotel Nairobi',
    name: 'Maisha Spa Package',
    description: 'Full day spa treatment including massage, facial, and body wrap',
    price: 15000,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    category: 'service'
  },

  // Villa Rosa Kempinski Products
  {
    id: '4',
    hotelId: '2',
    hotelName: 'Villa Rosa Kempinski',
    name: 'Presidential Suite',
    description: 'Luxurious suite with panoramic city views, butler service, and private terrace',
    price: 85000,
    rating: 5.0,
    imageUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    category: 'room'
  },
  {
    id: '5',
    hotelId: '2',
    hotelName: 'Villa Rosa Kempinski',
    name: 'Lucca Italian Restaurant Experience',
    description: 'Authentic Italian dining experience with wine pairing',
    price: 8500,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1579684947550-22e945225d9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    category: 'food'
  },
  {
    id: '6',
    hotelId: '2',
    hotelName: 'Villa Rosa Kempinski',
    name: 'Couples Spa Retreat',
    description: 'Romantic spa day for two including massage and champagne',
    price: 28000,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1591343395082-e120087004b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80',
    category: 'service'
  },

  // Tribe Hotel Products
  {
    id: '7',
    hotelId: '3',
    hotelName: 'Tribe Hotel',
    name: 'Superior Room',
    description: 'Modern room with artistic décor and city views',
    price: 32000,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80',
    category: 'room'
  },
  {
    id: '8',
    hotelId: '3',
    hotelName: 'Tribe Hotel',
    name: 'Jiko Restaurant Tasting Menu',
    description: 'Seven-course contemporary African cuisine experience',
    price: 9500,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    category: 'food'
  },
  {
    id: '9',
    hotelId: '3',
    hotelName: 'Tribe Hotel',
    name: 'Kaya Spa Treatment',
    description: 'Traditional African wellness treatment and massage',
    price: 18000,
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    category: 'service'
  },

  // Sankara Nairobi Products
  {
    id: '10',
    hotelId: '4',
    hotelName: 'Sankara Nairobi',
    name: 'Executive Suite',
    description: 'Contemporary suite with separate living area and workspace',
    price: 45000,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    category: 'room'
  },
  {
    id: '11',
    hotelId: '4',
    hotelName: 'Sankara Nairobi',
    name: 'Graze Steakhouse Experience',
    description: 'Premium steak dinner with wine pairing',
    price: 11000,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1594041680534-e8c8cdebd659?ixlib=rb-4.0.3&auto=format&fit=crop&w=1064&q=80',
    category: 'food'
  },
  {
    id: '12',
    hotelId: '4',
    hotelName: 'Sankara Nairobi',
    name: 'Angsana Spa Day',
    description: 'Full day of pampering with lunch included',
    price: 22000,
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    category: 'service'
  }
];

export default function Products() {
  const { user } = useAuth();
  const [selectedHotel, setSelectedHotel] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const filteredProducts = SAMPLE_PRODUCTS.filter(product => {
    if (selectedHotel !== 'all' && product.hotelId !== selectedHotel) return false;
    if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
    return true;
  });

  const handleAddToCart = (product: Product) => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }
    setCartItems([...cartItems, product]);
    toast.success(`${product.name} added to cart`);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
          
          <div className="flex space-x-4">
            <select
              value={selectedHotel}
              onChange={(e) => setSelectedHotel(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="all">All Hotels</option>
              <option value="1">Serena Hotel Nairobi</option>
              <option value="2">Villa Rosa Kempinski</option>
              <option value="3">Tribe Hotel</option>
              <option value="4">Sankara Nairobi</option>
            </select>
            
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="all">All Categories</option>
              <option value="room">Rooms</option>
              <option value="food">Food</option>
              <option value="service">Services</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {product.category}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-2">{product.hotelName}</p>
                
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="ml-1 text-gray-600">{product.rating}</span>
                </div>
                
                <p className="text-gray-600 mb-4">{product.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}