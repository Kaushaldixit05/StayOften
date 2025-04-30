import React, { useState, useEffect } from 'react';
import { fetchItineraries } from '../utils/api';
import { Itinerary, ItineraryFilter } from '../types';
import ItineraryCard from '../components/ItineraryCard';
import { default as ItineraryFilterComponent } from '../components/ItineraryFilter';
import HeroSection from '../components/HeroSection';

const ItinerariesPage: React.FC = () => {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [filteredItineraries, setFilteredItineraries] = useState<Itinerary[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<ItineraryFilter>({});

  useEffect(() => {
    const loadItineraries = async () => {
      try {
        setLoading(true);
        const data = await fetchItineraries();
        setItineraries(data);
        setFilteredItineraries(data);
        setError(null);
      } catch (err) {
        setError('Failed to load itineraries');
        // Use mock data for preview
        const mockData = getMockItineraries();
        setItineraries(mockData);
        setFilteredItineraries(mockData);
      } finally {
        setLoading(false);
      }
    };

    loadItineraries();
  }, []);

  const handleFilter = (newFilters: ItineraryFilter) => {
    setFilters(newFilters);
    
    // Apply filters
    let results = [...itineraries];
    
    if (newFilters.destination) {
      const searchTerm = newFilters.destination.toLowerCase();
      results = results.filter(item => 
        item.destination.toLowerCase().includes(searchTerm) || 
        item.title.toLowerCase().includes(searchTerm)
      );
    }
    
    if (newFilters.duration) {
      results = results.filter(item => item.duration === newFilters.duration);
    }
    
    if (newFilters.maxPrice) {
      results = results.filter(item => item.price <= newFilters.maxPrice);
    }
    
    setFilteredItineraries(results);
  };

  return (
    <div>
      <HeroSection 
        title="Explore Our Thailand Itineraries"
        subtitle="Discover expertly crafted travel itineraries for Phuket and Krabi"
        ctaText="Create Your Own"
        ctaLink="/create"
        image="https://images.pexels.com/photos/1020016/pexels-photo-1020016.jpeg"
      />
      
      <div className="container-custom py-12">
        <ItineraryFilterComponent onFilter={handleFilter} />
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="card h-64 animate-pulse">
                <div className="bg-gray-200 h-full"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-error-50 text-error-700 p-4 rounded-lg mb-6">
            {error}
          </div>
        ) : filteredItineraries.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold mb-2">No matching itineraries found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters to find more results</p>
            <button 
              onClick={() => handleFilter({})} 
              className="btn-outline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {filteredItineraries.length} {filteredItineraries.length === 1 ? 'Itinerary' : 'Itineraries'} Found
              </h2>
              <div className="flex items-center">
                <label className="text-sm text-gray-600 mr-2">Sort by:</label>
                <select className="select">
                  <option value="recommended">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="duration-low">Duration: Short to Long</option>
                  <option value="duration-high">Duration: Long to Short</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItineraries.map((itinerary) => (
                <ItineraryCard key={itinerary.id} itinerary={itinerary} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Mock data for preview
const getMockItineraries = (): Itinerary[] => [
  {
    id: 1,
    title: "Phuket Paradise Explorer",
    destination: "Phuket",
    duration: 4,
    price: 799,
    description: "Explore the stunning beaches and vibrant culture of Phuket.",
    highlights: [
      "Relaxing day at Patong Beach",
      "Phi Phi Islands boat tour",
      "Authentic Thai cooking class"
    ],
    image_url: "https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg",
    is_recommended: true,
    days: []
  },
  {
    id: 2,
    title: "Krabi Adventure",
    destination: "Krabi",
    duration: 4,
    price: 899,
    description: "Adventure through the limestone karsts and emerald waters of Krabi.",
    highlights: [
      "Railay Beach rock climbing",
      "Four Islands tour",
      "Hong Island kayaking experience"
    ],
    image_url: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg",
    is_recommended: true,
    days: []
  },
  {
    id: 3,
    title: "Phuket & Krabi Combo",
    destination: "Phuket & Krabi",
    duration: 4,
    price: 1099,
    description: "Experience the best of both Phuket and Krabi in one perfect itinerary.",
    highlights: [
      "Speedboat island hopping",
      "Night market food tour",
      "Beachfront sunset dinners"
    ],
    image_url: "https://images.pexels.com/photos/1287460/pexels-photo-1287460.jpeg",
    is_recommended: true,
    days: []
  },
  {
    id: 4,
    title: "Phuket Family Getaway",
    destination: "Phuket",
    duration: 5,
    price: 1299,
    description: "A family-friendly adventure through Phuket's top attractions.",
    highlights: [
      "Splash Jungle Water Park",
      "Elephant Sanctuary visit",
      "Phuket Aquarium tour"
    ],
    image_url: "https://images.pexels.com/photos/3601425/pexels-photo-3601425.jpeg",
    is_recommended: false,
    days: []
  },
  {
    id: 5,
    title: "Krabi Tranquility",
    destination: "Krabi",
    duration: 3,
    price: 699,
    description: "A peaceful retreat in the natural beauty of Krabi.",
    highlights: [
      "Emerald Pool and Hot Springs",
      "Sunset at Ao Nang Beach",
      "Traditional Thai massage"
    ],
    image_url: "https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg",
    is_recommended: false,
    days: []
  },
  {
    id: 6,
    title: "Thailand Island Explorer",
    destination: "Phuket & Krabi",
    duration: 7,
    price: 1599,
    description: "The ultimate island-hopping adventure across Thailand's best beaches.",
    highlights: [
      "James Bond Island tour",
      "Snorkeling at Koh Phi Phi",
      "Luxury beachfront accommodations"
    ],
    image_url: "https://images.pexels.com/photos/1292484/pexels-photo-1292484.jpeg",
    is_recommended: false,
    days: []
  }
];

export default ItinerariesPage;