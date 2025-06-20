import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { mockProperties } from '../utils/mockData';
import NeighborhoodInsights from '../components/NeighborhoodInsights';
import MapEmbed from '../components/MapEmbed';

const PropertyDetails = ({ isLoaded }) => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  
  // In a real app, this would be an API call
  const property = mockProperties.find(p => p.id === parseInt(id)) || mockProperties[0];

  const handleImageClick = (index) => {
    setActiveImage(index);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Image Gallery */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="relative h-96">
            <img
              src={property.images[activeImage]}
              alt={property.title ? property.title : 'Property image'}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4 flex space-x-2 overflow-x-auto">
            {property.images.map((image, index) => (
              <button
                key={index}
                onClick={() => handleImageClick(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${
                  activeImage === index ? 'ring-2 ring-blue-500' : ''
                }`}
                aria-label={`Show image ${index + 1} of ${property.title}`}
              >
                <img
                  src={image}
                  alt={`${property.title} - ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{property.title}</h1>
              <p className="text-2xl font-semibold text-blue-600 mb-4">${property.price.toLocaleString()}</p>
              <div className="flex items-center space-x-4 text-gray-600 mb-6">
                <span>{property.beds} beds</span>
                <span>•</span>
                <span>{property.baths} baths</span>
                <span>•</span>
                <span>{property.sqft} sqft</span>
              </div>
              <p className="text-gray-600 mb-6">{property.description}</p>
              
              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Features</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Location</h2>
              <p className="text-gray-600 mb-4">{property.location}</p>
              <MapEmbed initialLocation={property.coordinates || { lat: 28.6139, lng: 77.2090 }} isLoaded={isLoaded} />
            </div>
            <div className="mt-6">
              <a
                href={`https://wa.me/?text=Hi, I'm interested in ${property.title} at ${property.location}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full text-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                aria-label={`Chat on WhatsApp about ${property.title}`}
              >
                WhatsApp Now
              </a>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <div className="flex items-center mb-6">
                <img
                  src={property.agent.avatar}
                  alt={property.agent.name ? property.agent.name : 'Agent avatar'}
                  className="w-12 h-12 rounded-full"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">{property.agent.name}</h3>
                  <p className="text-gray-600">{property.agent.role}</p>
                </div>
              </div>

              <button
                onClick={() => setShowContactForm(!showContactForm)}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors mb-4"
                aria-expanded={showContactForm}
                aria-controls="contact-form"
                aria-label={showContactForm ? 'Hide contact form' : 'Show contact form'}
              >
                Contact Agent
              </button>

              {showContactForm && (
                <form className="space-y-4" id="contact-form">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      id="contact-name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      id="contact-email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                      type="tel"
                      id="contact-phone"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                      id="contact-message"
                      rows="4"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 transition-colors"
                  >
                    Send Message
                  </button>
                </form>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule a Viewing</h3>
                <button className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-200 transition-colors">
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Add Neighborhood Insights Section */}
        <div className="mt-12">
          <NeighborhoodInsights location={property.location} isLoaded={isLoaded} />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails; 