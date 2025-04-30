import axios from 'axios';
import { Itinerary, ItineraryFilter } from '../types';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchItineraries = async (filters: ItineraryFilter = {}): Promise<Itinerary[]> => {
  try {
    const response = await api.get('/itineraries', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching itineraries:', error);
    throw error;
  }
};

export const fetchItineraryById = async (id: number): Promise<Itinerary> => {
  try {
    const response = await api.get(`/itineraries/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching itinerary with id ${id}:`, error);
    throw error;
  }
};

export const createItinerary = async (itinerary: Omit<Itinerary, 'id'>): Promise<Itinerary> => {
  try {
    const response = await api.post('/itineraries', itinerary);
    return response.data;
  } catch (error) {
    console.error('Error creating itinerary:', error);
    throw error;
  }
};

export const fetchRecommendedItineraries = async (duration: number): Promise<Itinerary[]> => {
  try {
    const response = await api.get('/recommended-itineraries', {
      params: { duration },
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching recommended itineraries for ${duration} days:`, error);
    throw error;
  }
};