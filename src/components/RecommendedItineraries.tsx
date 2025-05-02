import React, { useState, useEffect } from 'react';
import { Itinerary } from '../types';
import ItineraryCard from './ItineraryCard';
import { fetchRecommendedItineraries } from '../utils/api';
import { ArrowRight } from 'lucide-react';

const RecommendedItineraries: React.FC = () => {
  const [itineraries, setItineraries] = useState<Itinerary[]>([]);
  const [duration, setDuration] = useState<number>(4);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadItineraries = async () => {
      try {
        setLoading(true);
        const data = await fetchRecommendedItineraries(duration);
        setItineraries(data);
        setError(null);
      } catch (err) {
        setError('Failed to load recommended itineraries');
      } finally {
        setLoading(false);
      }
    };

    loadItineraries();
  }, [duration]);

  const durationOptions = [2, 3, 4, 5, 6, 7, 8];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Recommended Itineraries</h2>
            <p className="text-gray-600 max-w-2xl">
              Our expert-curated selection of the best travel experiences in Thailand, tailored for different durations.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0">
            <div className="flex items-center space-x-2 bg-white rounded-full shadow-sm border border-gray-200 p-1">
              {durationOptions.map((days) => (
                <button
                  key={days}
                  className={`px-3 py-1 text-sm rounded-full transition-all ${
                    duration === days
                      ? 'bg-primary-500 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  onClick={() => setDuration(days)}
                >
                  {days} Days
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card h-64 animate-pulse">
                <div className="bg-gray-200 h-full"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-error-50 text-error-700 p-4 rounded-lg">
            {error}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {itineraries.map((itinerary) => (
                <ItineraryCard key={itinerary.id} itinerary={itinerary} />
              ))}
            </div>
            
            <div className="text-center mt-10">
              <a
                href="/itineraries"
                className="inline-flex items-center text-primary-500 hover:text-primary-600 font-medium transition-colors"
              >
                View all itineraries
                <ArrowRight size={16} className="ml-1" />
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default RecommendedItineraries;