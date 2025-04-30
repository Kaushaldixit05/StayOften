import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Tag } from 'lucide-react';
import { Itinerary } from '../types';

interface ItineraryCardProps {
  itinerary: Itinerary;
}

const ItineraryCard: React.FC<ItineraryCardProps> = ({ itinerary }) => {
  const { id, title, destination, duration, price, highlights, image_url, is_recommended } = itinerary;

  return (
    <Link to={`/itineraries/${id}`} className="block">
      <div className="card card-hover h-full group">
        {/* Image container with overlay */}
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image_url} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80" />
          
          {/* Recommended badge */}
          {is_recommended && (
            <div className="absolute top-3 right-3 bg-secondary-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
              Recommended
            </div>
          )}
          
          {/* Location badge */}
          <div className="absolute bottom-3 left-3 flex items-center text-white bg-black/50 px-2 py-1 rounded-full text-xs">
            <MapPin size={14} className="mr-1" />
            {destination}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-sans font-semibold text-lg text-gray-800">{title}</h3>
            <span className="text-primary-500 font-bold">${price}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <Clock size={16} className="mr-1" />
            <span>{duration} {duration === 1 ? 'day' : 'days'}</span>
          </div>
          
          {/* Highlights */}
          <div className="space-y-2 mb-4">
            {highlights.slice(0, 2).map((highlight, index) => (
              <div key={index} className="flex items-start">
                <Tag size={16} className="text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">{highlight}</p>
              </div>
            ))}
          </div>
          
          <button className="w-full btn-primary mt-2">View Details</button>
        </div>
      </div>
    </Link>
  );
};

export default ItineraryCard;