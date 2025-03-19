import React from 'react';
import { Star, MapPin } from 'lucide-react';
import type { Hotel } from '../types';

const SAMPLE_HOTELS: Hotel[] = [
  {
    id: '1',
    name: 'Serena Hotel Nairobi',
    description: 'Experience luxury in the heart of Nairobi with stunning city views and world-class amenities.',
    location: 'Processional Way, Nairobi',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    amenities: ['Spa', 'Pool', 'Gym', 'Multiple Restaurants', 'Business Center'],
    priceRange: '$$$'
  },
  {
    id: '2',
    name: 'Villa Rosa Kempinski',
    description: 'Luxury five-star hotel offering European refinement with an East African flair.',
    location: 'Chiromo Road, Westlands, Nairobi',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    amenities: ['Spa', 'Pool', 'Multiple Restaurants', 'Luxury Suites', 'Conference Center'],
    priceRange: '$$$$'
  },
  {
    id: '3',
    name: 'Tribe Hotel',
    description: 'A luxury boutique hotel celebrating African art and culture with modern amenities.',
    location: 'Limuru Road, Gigiri, Nairobi',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1585543805890-6051f7829f98?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    amenities: ['Spa', 'Gourmet Restaurant', 'Art Gallery', 'Business Center', 'Fitness Center'],
    priceRange: '$$$'
  },
  {
    id: '4',
    name: 'Sankara Nairobi',
    description: 'Contemporary urban hotel offering personalized service and distinctive experiences.',
    location: 'Woodvale Grove, Westlands, Nairobi',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    amenities: ['Rooftop Pool', 'Spa', 'Steakhouse', 'Champagne Bar', 'Meeting Rooms'],
    priceRange: '$$$'
  }
];

export default function Hotels() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Discover Our Hotels</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SAMPLE_HOTELS.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                src={hotel.imageUrl}
                alt={hotel.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-semibold text-gray-900">{hotel.name}</h2>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {hotel.priceRange}
                  </span>
                </div>
                
                <div className="flex items-center mb-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="ml-1 text-sm text-gray-600">{hotel.location}</span>
                </div>
                
                <div className="flex items-center mb-4">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="ml-1 text-gray-600">{hotel.rating}</span>
                </div>
                
                <p className="text-gray-600 mb-4">{hotel.description}</p>
                
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Amenities:</h3>
                  <div className="flex flex-wrap gap-2">
                    {hotel.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
                
                <button className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}