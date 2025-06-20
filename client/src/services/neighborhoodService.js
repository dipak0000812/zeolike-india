import axios from 'axios';

// API Keys from environment variables
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const WALKSCORE_API_KEY = process.env.REACT_APP_WALKSCORE_API_KEY;

// Base URLs
const GOOGLE_MAPS_BASE_URL = 'https://maps.googleapis.com/maps/api';
const WALKSCORE_BASE_URL = 'https://api.walkscore.com';
const BACKEND_BASE_URL = process.env.REACT_APP_BACKEND_BASE_URL || 'http://localhost:5000';

// Google Maps API Services
export const getCoordinates = async (address) => {
  try {
    const response = await axios.get(
      `${GOOGLE_MAPS_BASE_URL}/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`
    );
    return response.data.results[0].geometry.location;
  } catch (error) {
    console.error('Error getting coordinates:', error);
    return null;
  }
};

export const getNearbyPlaces = async (lat, lng, type, radius = 1500) => {
  try {
    const response = await axios.get(
      `${GOOGLE_MAPS_BASE_URL}/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=${type}&key=${GOOGLE_MAPS_API_KEY}`
    );
    return response.data.results.map(place => ({
      name: place.name,
      type: place.types[0],
      rating: place.rating,
      distance: calculateDistance(lat, lng, place.geometry.location.lat, place.geometry.location.lng),
      location: place.geometry.location,
      address: place.vicinity
    }));
  } catch (error) {
    console.error('Error getting nearby places:', error);
    return [];
  }
};

// WalkScore API Services
export const getWalkScore = async (lat, lng, address) => {
  try {
    const response = await axios.get(
      `${WALKSCORE_BASE_URL}/score?format=json&address=${encodeURIComponent(address)}&lat=${lat}&lon=${lng}&wsapikey=${WALKSCORE_API_KEY}`
    );
    return {
      walkScore: response.data.walkscore,
      transitScore: response.data.transit?.score || 0,
      bikeScore: response.data.bike?.score || 0,
      description: response.data.description
    };
  } catch (error) {
    console.error('Error getting walk score:', error);
    return null;
  }
};

// Backend API Service
export const getProperties = async () => {
  try {
    const response = await axios.get(`${BACKEND_BASE_URL}/api/properties`);
    return response.data.map(property => ({
      name: property.name,
      location: property.location,
      type: property.type || 'property',
      price: `$${property.price.toLocaleString()}`,
      image: property.image,
      rating: property.rating,
      distance: property.distance,
      link: property.link
    }));
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
};

// Helper function to calculate distance between two points
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return (distance * 0.621371).toFixed(1); // Convert to miles
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

// Combined API call to get all neighborhood data
export const getNeighborhoodData = async (address) => {
  try {
    // Get coordinates first
    const coordinates = await getCoordinates(address);
    if (!coordinates) throw new Error('Could not get coordinates for the address');

    // Fetch all data in parallel
    const [
      walkScoreData,
      restaurants,
      parks,
      shopping,
      schools
    ] = await Promise.all([
      getWalkScore(coordinates.lat, coordinates.lng, address),
      getNearbyPlaces(coordinates.lat, coordinates.lng, 'restaurant'),
      getNearbyPlaces(coordinates.lat, coordinates.lng, 'park'),
      getNearbyPlaces(coordinates.lat, coordinates.lng, 'shopping_mall'),
      getNearbyPlaces(coordinates.lat, coordinates.lng, 'school')
    ]);

    return {
      coordinates,
      walkScore: walkScoreData,
      amenities: {
        restaurants,
        parks,
        shopping,
        schools
      }
    };
  } catch (error) {
    console.error('Error getting neighborhood data:', error);
    throw error;
  }
}; 