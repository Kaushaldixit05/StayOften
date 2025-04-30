import React from 'react';
import { Link } from 'react-router-dom';
import { Palmtree, Instagram, Facebook, Twitter, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Palmtree size={24} className="text-primary-400" />
              <span className="font-serif font-semibold text-xl">ThaiJourney</span>
            </div>
            <p className="text-gray-300 mb-4">
              Discover the beauty of Thailand with our curated travel itineraries, designed to give you the perfect experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-sans text-lg font-semibold mb-4">Destinations</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Phuket</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Krabi</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Bangkok</a></li>
              <li><a href="#" className="text-gray-300 hover:text-primary-400 transition-colors">Chiang Mai</a></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-sans text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-primary-400 transition-colors">Home</Link></li>
              <li><Link to="/itineraries" className="text-gray-300 hover:text-primary-400 transition-colors">Itineraries</Link></li>
              <li><Link to="/create" className="text-gray-300 hover:text-primary-400 transition-colors">Create Itinerary</Link></li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="font-sans text-lg font-semibold mb-4">Contact Us</h3>
            <address className="not-italic text-gray-300">
              <p className="mb-2">123 Beach Road</p>
              <p className="mb-2">Phuket, Thailand</p>
              <p className="mb-2">info@thaijourney.com</p>
              <p>+66 123 456 789</p>
            </address>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} ThaiJourney. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;