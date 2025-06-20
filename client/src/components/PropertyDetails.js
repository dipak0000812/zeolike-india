import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getListingById } from '../services/api';
import Calculator from './Calculator';
import MapEmbed from './MapEmbed';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const data = await getListingById(id);
        setProperty(data);
      } catch (err) {
        setError('Failed to fetch property details. Please try again later.');
        console.error('Error fetching property:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const nextImage = () => {
    if (property && property.imageURLs.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === property.imageURLs.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (property && property.imageURLs.length > 0) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? property.imageURLs.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading property details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-red-700">{error}</p>
            <button
              onClick={() => navigate('/listings')}
              className="mt-4 text-indigo-600 hover:text-indigo-500"
            >
              ← Back to Listings
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">Property not found</h2>
            <button
              onClick={() => navigate('/listings')}
              className="mt-4 text-indigo-600 hover:text-indigo-500"
            >
              ← Back to Listings
            </button>
          </div>
        </div>
      </div>
    );
  }

  const hasImages = property.imageURLs && property.imageURLs.length > 0;

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={() => navigate('/listings')}
          className="mb-8 text-indigo-600 hover:text-indigo-500"
        >
          ← Back to Listings
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Image Gallery */}
          <div className="relative h-96">
            {hasImages ? (
              <img
                src={property.imageURLs[currentImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src='https://via.placeholder.com/800x400?text=No+Image'
                alt="No Image Available"
                className="w-full h-full object-cover"
              />
            )}
            {hasImages && property.imageURLs.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                >
                  ←
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75"
                >
                  →
                </button>
              </>
            )}
            {property.verified && (
              <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                Verified
              </div>
            )}
          </div>

          <div className="p-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {property.title}
                </h1>
                <p className="text-xl text-gray-600 mb-4">{property.location}</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-indigo-600">
                  ₹{property.price.toLocaleString()}
                </p>
                <p className="text-gray-500">per month</p>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-8">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'overview'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('features')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'features'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Facts & Features
                </button>
                <button
                  onClick={() => setActiveTab('marketValue')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'marketValue'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Market Value
                </button>
                <button
                  onClick={() => setActiveTab('calculator')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'calculator'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Payment Calculator
                </button>
                <button
                  onClick={() => setActiveTab('neighborhood')}
                  className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'neighborhood'
                      ? 'border-indigo-500 text-indigo-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Neighborhood
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div>
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
                  <p className="text-gray-600 whitespace-pre-line">{property.description}</p>

                  {property.coordinates && property.coordinates.latitude && property.coordinates.longitude && (
                    <div className="mt-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-4">Location on Map</h2>
                      <div className="h-80 rounded-lg overflow-hidden shadow-md">
                        <MapEmbed 
                          latitude={property.coordinates.latitude} 
                          longitude={property.coordinates.longitude}
                          zoom={15}
                        />
                      </div>
                    </div>
                  )}

                  <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <p className="text-gray-600">
                        <span className="font-semibold">Owner:</span> {property.owner}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Phone:</span> {property.phone}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-semibold">Email:</span> {property.email}
                      </p>
                      {property.phone && (
                        <a 
                          href={`https://wa.me/${property.phone}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-.94-1.543-1.455-3.329-1.455-5.184C.289 6.273 6.012.83 12.001.83c3.094 0 5.867 1.205 7.97 3.161C22.08 6.096 23.36 8.87 23.36 12.001c0 6.009-5.32 10.923-11.31 10.923h-.001c-1.855 0-3.64-.515-5.184-1.455L.057 24zm6.837-5.917l-.417-.25c-1.12-2.316-.27-4.996 2.046-6.116l.25-.417c.218-.363.504-.67.828-.908L14.73 6.05c.42-.31.89-.526 1.4-.633l.26-.05c.67-.13 1.34.02 1.83.47.49.45.64 1.12.51 1.79l-.05.26c-.107.51-.323.98-.633 1.4l-4.047 5.766c-.363.218-.67.504-.908.828l-.417.25c-2.316 1.12-4.996.27-6.116-2.046z"></path></svg>
                          WhatsApp Now
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'features' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Facts & Features</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center text-gray-700">
                      <span className="font-semibold w-24">Beds:</span>
                      <span>{property.beds}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="font-semibold w-24">Baths:</span>
                      <span>{property.baths}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="font-semibold w-24">Sq. Ft.:</span>
                      <span>{property.sqft}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <span className="font-semibold w-24">Property Type:</span>
                      <span className="capitalize">{property.propertyType}</span>
                    </div>
                  </div>
                  {property.features && property.features.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">Amenities & Features</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-gray-600">
                        {property.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <svg className="h-5 w-5 text-green-500 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 13l4 4L19 7"></path></svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'marketValue' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Market Value</h2>
                  <p className="text-gray-600">Market value data will be displayed here.</p>
                  <p className="text-gray-500 text-sm">This section will include historical price data, price per square foot comparisons, and market trends.</p>
                </div>
              )}

              {activeTab === 'calculator' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Calculator</h2>
                  <Calculator />
                </div>
              )}

              {activeTab === 'neighborhood' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-gray-900">Neighborhood</h2>
                  <p className="text-gray-600">Information about the neighborhood will be displayed here.</p>
                  <p className="text-gray-500 text-sm">This section will include nearby schools, hospitals, transportation, and other points of interest using Google Places API.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails; 