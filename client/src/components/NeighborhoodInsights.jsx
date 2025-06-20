import React, { useState, useEffect } from 'react';
import NeighborhoodMap from './NeighborhoodMap';
import {
  getCoordinates,
  getWalkScore,
  getNearbyPlaces,
  getProperties
} from '../services/neighborhoodService';

const NeighborhoodInsights = ({ location }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [neighborhoodData, setNeighborhoodData] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [pointsOfInterest, setPointsOfInterest] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Get coordinates for the location
        const coords = await getCoordinates(location);
        setCoordinates(coords);

        if (!coords) {
          throw new Error('Could not get coordinates for the location');
        }

        // Fetch all data in parallel, including properties
        const [
          walkScoreData,
          restaurants,
          parks,
          shopping,
          schools,
          properties
        ] = await Promise.all([
          getWalkScore(coords.lat, coords.lng, location),
          getNearbyPlaces(coords.lat, coords.lng, 'restaurant'),
          getNearbyPlaces(coords.lat, coords.lng, 'park'),
          getNearbyPlaces(coords.lat, coords.lng, 'shopping_mall'),
          getNearbyPlaces(coords.lat, coords.lng, 'school'),
          getProperties()
        ]);

        // Process and combine all the data
        const processedData = {
          overview: {
            walkScore: walkScoreData?.walkscore || 0,
            transitScore: walkScoreData?.transit?.score || 0,
            bikeScore: walkScoreData?.bike?.score || 0,
            description: walkScoreData?.description || 'No description available.'
          },
          amenities: {
            restaurants: restaurants.map(place => ({
              name: place.name,
              type: place.types[0],
              rating: place.rating,
              distance: `${(place.distance * 0.621371).toFixed(1)} miles`,
              location: place.geometry.location
            })),
            parks: parks.map(place => ({
              name: place.name,
              type: 'Park',
              features: place.types,
              distance: `${(place.distance * 0.621371).toFixed(1)} miles`,
              location: place.geometry.location
            })),
            shopping: shopping.map(place => ({
              name: place.name,
              type: 'Shopping',
              distance: `${(place.distance * 0.621371).toFixed(1)} miles`,
              location: place.geometry.location
            })),
            schools: schools.map(place => ({
              name: place.name,
              type: 'School',
              rating: place.rating,
              distance: `${(place.distance * 0.621371).toFixed(1)} miles`,
              location: place.geometry.location
            }))
          },
          properties: properties
        };

        setNeighborhoodData(processedData);

        // Combine all points of interest for the map, including properties
        const allPoints = [
          ...processedData.amenities.restaurants.map(restaurant => ({ ...restaurant, type: 'restaurant' })),
          ...processedData.amenities.parks.map(park => ({ ...park, type: 'park' })),
          ...processedData.amenities.shopping.map(shop => ({ ...shop, type: 'shopping' })),
          ...processedData.amenities.schools.map(school => ({ ...school, type: 'school' })),
          ...processedData.properties.map(property => ({ ...property, type: property.type || 'property' }))
        ];
        setPointsOfInterest(allPoints);

      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location]);

  if (loading) {
    return (
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 rounded-lg p-6">
        <div className="text-red-600">
          <p>Error loading neighborhood data: {error}</p>
        </div>
      </div>
    );
  }

  if (!neighborhoodData) {
    return null;
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900">Walk Score</h3>
                <p className="text-3xl font-bold text-blue-600">{neighborhoodData.overview.walkScore}</p>
                <p className="text-sm text-gray-600">Very Walkable</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900">Transit Score</h3>
                <p className="text-3xl font-bold text-green-600">{neighborhoodData.overview.transitScore}</p>
                <p className="text-sm text-gray-600">Good Transit</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-gray-900">Bike Score</h3>
                <p className="text-3xl font-bold text-purple-600">{neighborhoodData.overview.bikeScore}</p>
                <p className="text-sm text-gray-600">Very Bikeable</p>
              </div>
            </div>
            <p className="text-gray-600">{neighborhoodData.overview.description}</p>
          </div>
        );

      case 'amenities':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Restaurants & Food</h3>
              <div className="space-y-2">
                {neighborhoodData.amenities.restaurants.map((place, index) => (
                  <div key={index} className="bg-white p-3 rounded-lg shadow">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{place.name}</p>
                        <p className="text-sm text-gray-600">{place.type}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-blue-600">{place.rating} ★</p>
                        <p className="text-sm text-gray-600">{place.distance}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Parks & Recreation</h3>
              <div className="space-y-2">
                {neighborhoodData.amenities.parks.map((park, index) => (
                  <div key={index} className="bg-white p-3 rounded-lg shadow">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{park.name}</p>
                        <p className="text-sm text-gray-600">{park.type}</p>
                        <p className="text-sm text-gray-500">{park.features.join(' • ')}</p>
                      </div>
                      <p className="text-sm text-gray-600">{park.distance}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Shopping</h3>
              <div className="space-y-2">
                {neighborhoodData.amenities.shopping.map((place, index) => (
                  <div key={index} className="bg-white p-3 rounded-lg shadow">
                    <div>
                      <p className="font-medium text-gray-900">{place.name}</p>
                      <p className="text-sm text-gray-600">{place.type}</p>
                    </div>
                    <p className="text-sm text-gray-600">{place.distance}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Schools</h3>
              <div className="space-y-2">
                {neighborhoodData.amenities.schools.map((school, index) => (
                  <div key={index} className="bg-white p-3 rounded-lg shadow">
                    <div>
                      <p className="font-medium text-gray-900">{school.name}</p>
                      <p className="text-sm text-gray-600">{school.type}</p>
                      {school.rating && (
                        <p className="text-sm text-blue-600">{school.rating} ★</p>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{school.distance}</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Properties</h3>
              <div className="space-y-2">
                {neighborhoodData.properties.map((property, index) => (
                  <div key={index} className="bg-white p-3 rounded-lg shadow">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-900">{property.name}</p>
                        <p className="text-sm text-gray-600">{property.type}</p>
                        <p className="text-sm text-green-700">{property.price}</p>
                      </div>
                      {property.image && (
                        <img src={property.image} alt={property.name} className="w-16 h-12 object-cover rounded" />
                      )}
                    </div>
                    {property.distance && (
                      <p className="text-sm text-gray-600">{property.distance}</p>
                    )}
                    {property.link && (
                      <a
                        href={property.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                      >
                        View Details
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Neighborhood Insights</h2>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          {['overview', 'amenities'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Map Section */}
      <div className="mb-8">
        <NeighborhoodMap
          location={coordinates}
          pointsOfInterest={pointsOfInterest}
          isLoaded={!loading && !error}
        />
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default NeighborhoodInsights; 