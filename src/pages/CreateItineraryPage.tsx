import React, { useState } from 'react';
import { createItinerary } from '../utils/api';
import { MapPin, Plus, Trash2, Clock, Briefcase, Car, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CreateItineraryPage: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    duration: 3,
    price: '',
    description: '',
    image_url: '',
    highlights: ['', '', ''],
    is_recommended: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleHighlightChange = (index: number, value: string) => {
    const newHighlights = [...formData.highlights];
    newHighlights[index] = value;
    setFormData({
      ...formData,
      highlights: newHighlights
    });
  };

  const addHighlight = () => {
    setFormData({
      ...formData,
      highlights: [...formData.highlights, '']
    });
  };

  const removeHighlight = (index: number) => {
    const newHighlights = [...formData.highlights];
    newHighlights.splice(index, 1);
    setFormData({
      ...formData,
      highlights: newHighlights
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      
      // Filter out empty highlights
      const filteredHighlights = formData.highlights.filter(h => h.trim() !== '');
      
      // Validate form
      if (!formData.title || !formData.destination || !formData.description || filteredHighlights.length === 0) {
        throw new Error('Please fill in all required fields');
      }

      if (isNaN(parseFloat(formData.price))) {
        throw new Error('Please enter a valid price');
      }
      
      // Create mock days data that matches the backend schema
      const mockDays = Array.from({ length: formData.duration }, (_, i) => ({
        day: i + 1,
        accommodation_id: 1, // Using a fixed accommodation ID for demo
        activity_ids: [1],   // Using a fixed activity ID for demo
        transfer_ids: [1]    // Using a fixed transfer ID for demo
      }));
      
      // Prepare data for submission
      const submitData = {
        title: formData.title,
        destination: formData.destination,
        duration: formData.duration,
        price: parseFloat(formData.price),
        description: formData.description,
        highlights: filteredHighlights,
        image_url: formData.image_url,
        is_recommended: formData.is_recommended,
        days: mockDays
      };
      
      console.log('Submitting:', JSON.stringify(submitData, null, 2));
      
      // Call API
      await createItinerary(submitData);
      
      // Show success message
      setSuccess(true);
      
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-primary-500 p-6 text-white">
            <h1 className="text-2xl font-bold">Create New Itinerary</h1>
            <p>Design your own custom travel itinerary for Thailand</p>
          </div>
          
          {success ? (
            <div className="p-6">
              <div className="bg-success-50 text-success-700 p-4 rounded-lg mb-6">
                <h2 className="text-xl font-semibold mb-2">Itinerary Created Successfully!</h2>
                <p className="mb-4">Your itinerary has been created. In a real application, you would be redirected to view it.</p>
                <button 
                  onClick={() => {
                    setSuccess(false);
                    setFormData({
                      title: '',
                      destination: '',
                      duration: 3,
                      price: '',
                      description: '',
                      image_url: '',
                      highlights: ['', '', ''],
                      is_recommended: false
                    });
                  }}
                  className="btn-outline"
                >
                  Create Another Itinerary
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6">
              {error && (
                <div className="bg-error-50 text-error-700 p-4 rounded-lg mb-6">
                  {error}
                </div>
              )}
              
              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Itinerary Title*
                      </label>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="input w-full"
                        placeholder="E.g., Phuket Explorer"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Destination*
                      </label>
                      <div className="relative">
                        <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <select
                          name="destination"
                          value={formData.destination}
                          onChange={handleChange}
                          className="input w-full pl-10"
                          required
                        >
                          <option value="">Select destination</option>
                          <option value="Phuket">Phuket</option>
                          <option value="Krabi">Krabi</option>
                          <option value="Phuket & Krabi">Phuket & Krabi</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration (days)*
                      </label>
                      <div className="relative">
                        <Clock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <select
                          name="duration"
                          value={formData.duration}
                          onChange={handleChange}
                          className="input w-full pl-10"
                          required
                        >
                          {[2, 3, 4, 5, 6, 7, 8].map(num => (
                            <option key={num} value={num}>{num} days</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price (USD)*
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          className="input w-full pl-10"
                          placeholder="E.g., 799"
                          min="0"
                          step="0.01"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description*
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="input w-full h-32"
                    placeholder="Describe your itinerary..."
                    required
                  />
                </div>
                
                {/* Image URL */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Featured Image URL
                  </label>
                  <input
                    type="text"
                    name="image_url"
                    value={formData.image_url}
                    onChange={handleChange}
                    className="input w-full"
                    placeholder="E.g., https://example.com/image.jpg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Provide a URL to an image that represents your itinerary
                  </p>
                </div>
                
                {/* Highlights */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Highlights*
                    </label>
                    <button
                      type="button"
                      onClick={addHighlight}
                      className="text-sm text-primary-500 flex items-center"
                    >
                      <Plus size={16} className="mr-1" />
                      Add highlight
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {formData.highlights.map((highlight, index) => (
                      <div key={index} className="flex gap-2">
                        <input
                          type="text"
                          value={highlight}
                          onChange={(e) => handleHighlightChange(index, e.target.value)}
                          className="input flex-grow"
                          placeholder={`Highlight ${index + 1}`}
                          required={index < 3}
                        />
                        {index >= 3 && (
                          <button
                            type="button"
                            onClick={() => removeHighlight(index)}
                            className="p-2 bg-gray-100 rounded-md text-gray-500 hover:bg-gray-200"
                          >
                            <Trash2 size={18} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    At least 3 highlights are required
                  </p>
                </div>
                
                {/* Recommended checkbox */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="is_recommended"
                    name="is_recommended"
                    checked={formData.is_recommended}
                    onChange={(e) => setFormData({
                      ...formData,
                      is_recommended: e.target.checked
                    })}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="is_recommended" className="ml-2 block text-sm text-gray-700">
                    Mark as recommended itinerary
                  </label>
                </div>
                
                {/* Placeholder for day-by-day planning */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center mb-4">
                    <Calendar size={20} className="text-primary-500 mr-2" />
                    <h3 className="text-lg font-semibold">Day-by-Day Planning</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-4">
                    For this demo, we're automatically generating sample day plans using accommodation ID 1, activity ID 1, and transfer ID 1.
                    In a complete application, you would be able to select specific accommodations, activities, and transfers for each day.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-start p-3 bg-white rounded-md shadow-sm">
                      <Briefcase size={18} className="text-primary-500 mr-2 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Accommodation ID</h4>
                        <p className="text-sm text-gray-500">Using ID: 1</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start p-3 bg-white rounded-md shadow-sm">
                      <Car size={18} className="text-primary-500 mr-2 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Transfer IDs</h4>
                        <p className="text-sm text-gray-500">Using ID: 1</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start p-3 bg-white rounded-md shadow-sm">
                      <MapPin size={18} className="text-primary-500 mr-2 mt-0.5" />
                      <div>
                        <h4 className="font-medium">Activity IDs</h4>
                        <p className="text-sm text-gray-500">Using ID: 1</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Form Actions */}
                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <button
                    type="button"
                    className="btn-outline"
                    onClick={() => navigate('/itineraries')}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading}
                  >
                    {loading ? 'Creating...' : 'Create Itinerary'}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateItineraryPage;