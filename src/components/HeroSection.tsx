import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  image?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  image = 'https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg',
}) => {
  return (
    <div 
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      
      {/* Content */}
      <div className="container-custom relative z-10 text-center text-white py-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight animate-slide-up">
          {title}
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          {subtitle}
        </p>
        <Link
          to={ctaLink}
          className="inline-flex items-center bg-secondary-500 hover:bg-secondary-600 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 animate-slide-up"
          style={{ animationDelay: '0.2s' }}
        >
          {ctaText}
          <ArrowRight className="ml-2" size={18} />
        </Link>
      </div>
      
      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </div>
  );
};

export default HeroSection;