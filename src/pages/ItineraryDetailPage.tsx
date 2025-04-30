import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchItineraryById } from '../utils/api';
import { Itinerary } from '../types';
import { MapPin, Clock, Calendar, DollarSign, Star, Luggage, MapPinned, Utensils } from 'lucide-react';

const ItineraryDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeDay, setActiveDay] = useState<number>(1);

  useEffect(() => {
    const loadItinerary = async () => {
      try {
        setLoading(true);
        if (id) {
          const data = await fetchItineraryById(parseInt(id));
          setItinerary(data);
        }
        setError(null);
      } catch (err) {
        setError('Failed to load itinerary details');
        // Use mock data for preview
        setItinerary(getMockItinerary());
      } finally {
        setLoading(false);
      }
    };

    loadItinerary();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex justify-center items-center">
        <div className="animate-pulse space-y-8 w-full max-w-4xl">
          <div className="h-96 bg-gray-200 w-full rounded-xl"></div>
          <div className="h-8 bg-gray-200 w-3/4 rounded"></div>
          <div className="h-4 bg-gray-200 w-1/2 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !itinerary) {
    return (
      <div className="min-h-screen pt-24 pb-12 container-custom">
        <div className="bg-error-50 text-error-700 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Error</h2>
          <p>{error || 'Itinerary not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <div 
        className="relative h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: `url(${itinerary.image_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black"></div>
        
        <div className="container-custom relative z-10">
          <div className="text-white max-w-3xl">
            {itinerary.is_recommended && (
              <div className="inline-block bg-secondary-500 text-white text-sm font-semibold px-3 py-1 rounded-full mb-4">
                Recommended Itinerary
              </div>
            )}
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{itinerary.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90 mb-4">
              <div className="flex items-center">
                <MapPin size={18} className="mr-1" />
                <span>{itinerary.destination}</span>
              </div>
              <div className="flex items-center">
                <Clock size={18} className="mr-1" />
                <span>{itinerary.duration} {itinerary.duration === 1 ? 'day' : 'days'}</span>
              </div>
              <div className="flex items-center">
                <DollarSign size={18} className="mr-1" />
                <span>From ${itinerary.price}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">About This Itinerary</h2>
              <p className="text-gray-700 mb-6">{itinerary.description}</p>
              
              <h3 className="text-xl font-semibold mb-3">Highlights</h3>
              <ul className="space-y-2 mb-6">
                {itinerary.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <Star size={18} className="text-secondary-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Day-by-day itinerary */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Day-by-Day Itinerary</h2>
              
              {/* Day selection pills */}
              <div className="flex space-x-2 overflow-x-auto pb-2 mb-6">
                {Array.from({ length: itinerary.duration }, (_, i) => i + 1).map((day) => (
                  <button
                    key={day}
                    className={`px-4 py-2 rounded-full transition-colors whitespace-nowrap ${
                      activeDay === day
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setActiveDay(day)}
                  >
                    Day {day}
                  </button>
                ))}
              </div>
              
              {/* Active day details */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {itinerary.days && itinerary.days[activeDay - 1] ? (
                  <div className="animate-fade-in">
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-4">Day {activeDay}</h3>
                      
                      {/* Accommodation */}
                      <div className="mb-6">
                        <div className="flex items-center text-primary-500 font-semibold mb-2">
                          <Luggage size={18} className="mr-2" />
                          <h4 className="text-lg">Accommodation</h4>
                        </div>
                        
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex flex-col md:flex-row gap-4">
                            <img 
                              src={itinerary.days[activeDay - 1].accommodation.image_url}
                              alt={itinerary.days[activeDay - 1].accommodation.name}
                              className="w-full md:w-32 h-24 object-cover rounded-md"
                            />
                            <div>
                              <h5 className="font-semibold mb-1">{itinerary.days[activeDay - 1].accommodation.name}</h5>
                              <p className="text-sm text-gray-600 mb-1">{itinerary.days[activeDay - 1].accommodation.location}</p>
                              <div className="flex items-center text-sm text-gray-600">
                                <span className="mr-2">{itinerary.days[activeDay - 1].accommodation.type}</span>
                                <div className="flex">
                                  {Array.from({ length: 5 }, (_, i) => (
                                    <Star 
                                      key={i}
                                      size={14}
                                      fill={i < itinerary.days[activeDay - 1].accommodation.rating ? "currentColor" : "none"}
                                      className={i < itinerary.days[activeDay - 1].accommodation.rating ? "text-secondary-500" : "text-gray-300"}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Activities */}
                      <div className="mb-6">
                        <div className="flex items-center text-primary-500 font-semibold mb-2">
                          <Calendar size={18} className="mr-2" />
                          <h4 className="text-lg">Activities</h4>
                        </div>
                        
                        <div className="space-y-4">
                          {itinerary.days[activeDay - 1].activities.map((activity, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-4">
                              <div className="flex flex-col md:flex-row gap-4">
                                <img 
                                  src={activity.image_url}
                                  alt={activity.name}
                                  className="w-full md:w-32 h-24 object-cover rounded-md"
                                />
                                <div>
                                  <h5 className="font-semibold mb-1">{activity.name}</h5>
                                  <p className="text-sm text-gray-600 mb-1">{activity.location}</p>
                                  <div className="flex items-center text-sm text-gray-600 mb-2">
                                    <Clock size={14} className="mr-1" />
                                    <span>{activity.duration} {activity.duration === 1 ? 'hour' : 'hours'}</span>
                                  </div>
                                  <p className="text-sm">{activity.description}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Transfers */}
                      <div>
                        <div className="flex items-center text-primary-500 font-semibold mb-2">
                          <MapPinned size={18} className="mr-2" />
                          <h4 className="text-lg">Transfers</h4>
                        </div>
                        
                        <div className="space-y-4">
                          {itinerary.days[activeDay - 1].transfers.map((transfer, index) => (
                            <div key={index} className="bg-gray-50 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <div className="font-semibold">{transfer.from_location} → {transfer.to_location}</div>
                                <div className="text-sm text-gray-600">
                                  <span className="bg-gray-200 px-2 py-1 rounded">{transfer.type}</span>
                                </div>
                              </div>
                              <div className="flex items-center text-sm text-gray-600 mb-2">
                                <Clock size={14} className="mr-1" />
                                <span>{transfer.duration} {transfer.duration === 1 ? 'hour' : 'hours'}</span>
                              </div>
                              <p className="text-sm">{transfer.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    <p>Day details not available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            <div className="bg-white rounded-xl shadow-md p-6 mb-8 sticky top-24">
              <h3 className="text-xl font-semibold mb-4">Book This Itinerary</h3>
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-600">Starting from</span>
                <span className="text-2xl font-bold text-primary-600">${itinerary.price}</span>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Travel Dates</label>
                <input type="date" className="input w-full" />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of Travelers</label>
                <select className="select w-full">
                  <option value="1">1 Person</option>
                  <option value="2">2 People</option>
                  <option value="3">3 People</option>
                  <option value="4">4 People</option>
                  <option value="5+">5+ People</option>
                </select>
              </div>
              
              <button className="btn-primary w-full mb-4">Book Now</button>
              <button className="btn-outline w-full">Contact a Travel Specialist</button>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600 mb-2">This itinerary includes:</div>
                <ul className="space-y-2">
                  <li className="flex items-start text-sm">
                    <Luggage size={16} className="text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{itinerary.duration - 1} nights accommodation</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <MapPinned size={16} className="text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>All transfers as specified</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <Calendar size={16} className="text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Activities and excursions</span>
                  </li>
                  <li className="flex items-start text-sm">
                    <Utensils size={16} className="text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Some meals as specified</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mock data for preview
const getMockItinerary = (): Itinerary => ({
  id: 1,
  title: "Phuket Paradise Explorer",
  destination: "Phuket",
  duration: 4,
  price: 799,
  description: "Experience the best of Phuket with this perfectly balanced 4-day itinerary. From stunning beaches to cultural sites, delicious food experiences to island adventures, this itinerary offers a comprehensive introduction to Thailand's largest and most popular island. You'll enjoy a mix of guided activities and free time to explore at your own pace.",
  highlights: [
    "Relaxing day at world-famous Patong Beach with water activities",
    "Full-day Phi Phi Islands speedboat tour with snorkeling",
    "Authentic Thai cooking class learning to prepare local specialties",
    "Big Buddha and cultural temple tour with panoramic island views",
    "Night market exploration for street food and souvenirs"
  ],
  image_url: "https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg",
  is_recommended: true,
  days: [
    {
      day: 1,
      accommodation: {
        id: 101,
        name: "The Palmery Resort & Spa",
        location: "Patong Beach, Phuket",
        type: "Resort",
        rating: 4,
        description: "A beautiful resort near Patong Beach with lush gardens and a spa.",
        amenities: ["Swimming Pool", "Spa", "Restaurant", "Free WiFi", "Airport Shuttle"],
        image_url: "https://images.pexels.com/photos/53464/sheraton-palace-hotel-lobby-architecture-53464.jpeg"
      },
      transfers: [
        {
          id: 201,
          from_location: "Phuket International Airport",
          to_location: "The Palmery Resort & Spa",
          type: "Private Car",
          duration: 1,
          description: "Comfortable private transfer from the airport to your hotel with air conditioning and bottled water."
        }
      ],
      activities: [
        {
          id: 301,
          name: "Patong Beach Relaxation",
          location: "Patong Beach",
          category: "Beach",
          duration: 4,
          description: "Spend your afternoon relaxing at the famous Patong Beach. Lounge on the sand, swim in the Andaman Sea, or try water sports like jet skiing and parasailing.",
          included: ["Beach chair", "Umbrella"],
          image_url: "https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg"
        },
        {
          id: 302,
          name: "Welcome Dinner",
          location: "Beach Road Restaurant",
          category: "Food",
          duration: 2,
          description: "Enjoy a welcome dinner at a beachfront restaurant with a selection of authentic Thai dishes and seafood specialties.",
          included: ["Three-course meal", "Welcome drink"],
          image_url: "https://images.pexels.com/photos/5718071/pexels-photo-5718071.jpeg"
        }
      ]
    },
    {
      day: 2,
      accommodation: {
        id: 101,
        name: "The Palmery Resort & Spa",
        location: "Patong Beach, Phuket",
        type: "Resort",
        rating: 4,
        description: "A beautiful resort near Patong Beach with lush gardens and a spa.",
        amenities: ["Swimming Pool", "Spa", "Restaurant", "Free WiFi", "Airport Shuttle"],
        image_url: "https://images.pexels.com/photos/53464/sheraton-palace-hotel-lobby-architecture-53464.jpeg"
      },
      transfers: [
        {
          id: 202,
          from_location: "The Palmery Resort & Spa",
          to_location: "Rassada Pier",
          type: "Minivan",
          duration: 0.5,
          description: "Morning transfer to Rassada Pier for your Phi Phi Islands tour."
        },
        {
          id: 203,
          from_location: "Rassada Pier",
          to_location: "The Palmery Resort & Spa",
          type: "Minivan",
          duration: 0.5,
          description: "Evening return transfer from Rassada Pier to your hotel."
        }
      ],
      activities: [
        {
          id: 303,
          name: "Phi Phi Islands Tour",
          location: "Phi Phi Islands",
          category: "Island Tour",
          duration: 8,
          description: "Full-day speedboat tour to the stunning Phi Phi Islands. Visit Maya Bay (made famous by the movie 'The Beach'), explore Viking Cave, and enjoy snorkeling in crystal clear waters teeming with colorful marine life.",
          included: ["Speedboat transfer", "Lunch", "Snorkeling equipment", "National park fees", "English-speaking guide"],
          image_url: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg"
        }
      ]
    },
    {
      day: 3,
      accommodation: {
        id: 101,
        name: "The Palmery Resort & Spa",
        location: "Patong Beach, Phuket",
        type: "Resort",
        rating: 4,
        description: "A beautiful resort near Patong Beach with lush gardens and a spa.",
        amenities: ["Swimming Pool", "Spa", "Restaurant", "Free WiFi", "Airport Shuttle"],
        image_url: "https://images.pexels.com/photos/53464/sheraton-palace-hotel-lobby-architecture-53464.jpeg"
      },
      transfers: [
        {
          id: 204,
          from_location: "The Palmery Resort & Spa",
          to_location: "Phuket Cooking Academy",
          type: "Private Car",
          duration: 0.5,
          description: "Morning transfer to your cooking class."
        },
        {
          id: 205,
          from_location: "Phuket Cooking Academy",
          to_location: "Big Buddha",
          type: "Private Car",
          duration: 0.5,
          description: "Afternoon transfer to Big Buddha."
        },
        {
          id: 206,
          from_location: "Cultural Sites",
          to_location: "The Palmery Resort & Spa",
          type: "Private Car",
          duration: 0.5,
          description: "Evening return to your hotel."
        }
      ],
      activities: [
        {
          id: 304,
          name: "Thai Cooking Class",
          location: "Phuket Cooking Academy",
          category: "Cultural",
          duration: 4,
          description: "Learn to prepare authentic Thai dishes with a professional chef. Visit a local market to select fresh ingredients, then cook several dishes including a curry, stir-fry, soup, and dessert.",
          included: ["Market tour", "Cooking class", "Lunch", "Recipe booklet"],
          image_url: "https://images.pexels.com/photos/5718071/pexels-photo-5718071.jpeg"
        },
        {
          id: 305,
          name: "Cultural Sites Tour",
          location: "Various locations in Phuket",
          category: "Cultural",
          duration: 4,
          description: "Afternoon tour of Phuket's cultural highlights, including the Big Buddha statue with panoramic island views, Wat Chalong Temple, and a drive through Phuket Old Town to see the Sino-Portuguese architecture.",
          included: ["English-speaking guide", "Entrance fees", "Bottled water"],
          image_url: "https://images.pexels.com/photos/6266007/pexels-photo-6266007.jpeg"
        }
      ]
    },
    {
      day: 4,
      accommodation: {
        id: 101,
        name: "The Palmery Resort & Spa",
        location: "Patong Beach, Phuket",
        type: "Resort",
        rating: 4,
        description: "A beautiful resort near Patong Beach with lush gardens and a spa.",
        amenities: ["Swimming Pool", "Spa", "Restaurant", "Free WiFi", "Airport Shuttle"],
        image_url: "https://images.pexels.com/photos/53464/sheraton-palace-hotel-lobby-architecture-53464.jpeg"
      },
      transfers: [
        {
          id: 207,
          from_location: "The Palmery Resort & Spa",
          to_location: "Phuket International Airport",
          type: "Private Car",
          duration: 1,
          description: "Transfer to the airport for your departure flight."
        }
      ],
      activities: [
        {
          id: 306,
          name: "Free Morning",
          location: "The Palmery Resort & Spa",
          category: "Leisure",
          duration: 3,
          description: "Enjoy a free morning to relax at your resort, use the spa facilities, or do some last-minute shopping near your hotel.",
          included: ["Hotel facilities"],
          image_url: "https://images.pexels.com/photos/261041/pexels-photo-261041.jpeg"
        }
      ]
    }
  ]
});

export default ItineraryDetailPage;