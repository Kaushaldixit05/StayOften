export interface Accommodation {
  id: number;
  name: string;
  location: string;
  type: string;
  rating: number;
  description: string;
  amenities: string[];
  image_url: string;
}

export interface Transfer {
  id: number;
  from_location: string;
  to_location: string;
  type: string;
  duration: number;
  description: string;
}

export interface Activity {
  id: number;
  name: string;
  location: string;
  category: string;
  duration: number;
  description: string;
  included: string[];
  image_url: string;
}

export interface ItineraryDay {
  day: number;
  accommodation: Accommodation;
  transfers: Transfer[];
  activities: Activity[];
}

export interface Itinerary {
  id: number;
  title: string;
  destination: string;
  duration: number;
  price: number;
  description: string;
  highlights: string[];
  image_url: string;
  days: ItineraryDay[];
  is_recommended: boolean;
}

export interface ItineraryFilter {
  duration?: number;
  destination?: string;
  maxPrice?: number;
}