import React from 'react';
import HeroSection from '../components/HeroSection';
import RecommendedItineraries from '../components/RecommendedItineraries';
import { Compass, Sun, Map, Users, Calendar, Shield } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroSection 
        title="Discover Thailand's Hidden Treasures"
        subtitle="Expertly crafted itineraries for unforgettable experiences in Phuket and Krabi"
        ctaText="Explore Itineraries"
        ctaLink="/itineraries"
      />
      
      {/* Featured Destinations */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-4">Featured Destinations</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Discover the mesmerizing beauty of Thailand's most captivating regions, where turquoise waters meet limestone cliffs.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Phuket Card */}
            <div className="rounded-xl overflow-hidden shadow-lg relative group">
              <img 
                src="https://images.pexels.com/photos/1450361/pexels-photo-1450361.jpeg" 
                alt="Phuket" 
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Phuket</h3>
                <p className="mb-4">Thailand's largest island, known for stunning beaches, vibrant nightlife, and cultural attractions.</p>
                <a href="/itineraries?destination=Phuket" className="inline-block bg-secondary-500 hover:bg-secondary-600 text-white px-4 py-2 rounded-full transition-colors">
                  Explore Phuket
                </a>
              </div>
            </div>
            
            {/* Krabi Card */}
            <div className="rounded-xl overflow-hidden shadow-lg relative group">
              <img 
                src="https://images.pexels.com/photos/1098365/pexels-photo-1098365.jpeg" 
                alt="Krabi" 
                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Krabi</h3>
                <p className="mb-4">A paradise of limestone karsts, jungle-covered interiors, and crystal-clear emerald waters.</p>
                <a href="/itineraries?destination=Krabi" className="inline-block bg-secondary-500 hover:bg-secondary-600 text-white px-4 py-2 rounded-full transition-colors">
                  Explore Krabi
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Recommended Itineraries */}
      <RecommendedItineraries />
      
      {/* Why Choose Us */}
      <section className="py-16 bg-primary-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-4">Why Choose Our Itineraries</h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Our handcrafted travel experiences are designed by local experts to ensure you get the most out of your Thailand adventure.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Compass className="text-primary-500" size={40} />,
                title: "Expert Local Knowledge",
                description: "Our itineraries are crafted by Thailand travel specialists with deep local connections and insights."
              },
              {
                icon: <Map className="text-primary-500" size={40} />,
                title: "Perfectly Balanced",
                description: "The ideal mix of must-see highlights and off-the-beaten-path experiences to create unforgettable journeys."
              },
              {
                icon: <Calendar className="text-primary-500" size={40} />,
                title: "Flexible Durations",
                description: "Choose from 2-8 night itineraries, perfectly planned to maximize your available time."
              },
              {
                icon: <Users className="text-primary-500" size={40} />,
                title: "Personalized Experience",
                description: "Customize any itinerary to match your interests, pace, and travel style."
              },
              {
                icon: <Sun className="text-primary-500" size={40} />,
                title: "Seasonal Recommendations",
                description: "Our suggestions change with the seasons to ensure optimal experiences year-round."
              },
              {
                icon: <Shield className="text-primary-500" size={40} />,
                title: "Trusted Partners",
                description: "All accommodations, activities, and transport are provided by our carefully selected partners."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-md">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-secondary-500 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Plan Your Thai Adventure?</h2>
          <p className="max-w-xl mx-auto mb-8 text-lg">
            Start exploring our curated collection of Thailand itineraries or create your own perfect journey today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a href="/itineraries" className="btn bg-white text-secondary-500 hover:bg-gray-100">
              Browse Itineraries
            </a>
            <a href="/create" className="btn bg-secondary-600 text-white hover:bg-secondary-700 border border-white">
              Create Your Own
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;