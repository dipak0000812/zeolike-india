import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { mockProperties } from '../utils/mockData';

const heroBg = 'https://images.unsplash.com/photo-1560518883-ff51f81648a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'; // High-quality image URL

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/property-search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Zillow Style */}
      <div
        className="relative flex flex-col items-center justify-center text-center py-24 md:py-32 px-4"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '450px',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div> {/* Dark overlay */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-lg">
            Agents. Tours. Loans. Homes.
          </h1>
          <form className="w-full flex justify-center" onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
            <input
              type="text"
              placeholder="Enter an address, neighborhood, city, or ZIP code"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-5/6 lg:w-3/4 px-6 py-4 rounded-l-full text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ background: 'rgba(255,255,255,0.95)' }} // Slightly translucent white
            />
            <button
              type="submit"
              className="ml-0.5 px-6 py-4 rounded-r-full bg-blue-600 text-white font-semibold text-lg shadow-lg hover:bg-blue-700 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Buy, Sell, Rent Cards - Zillow Style */}
      <div className="max-w-6xl mx-auto -mt-16 md:-mt-24 relative z-20 grid grid-cols-1 md:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8">
        {/* Buy a home */}
        <Link to="/property-search?type=sale" className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100 hover:shadow-xl transition-all duration-300">
          <svg className="w-16 h-16 mb-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 12v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1V12m0 0a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <h2 className="text-xl font-bold mb-2 text-gray-900">Buy a home</h2>
          <p className="text-gray-600 mb-4">Find your place with an immersive photo experience and the most listings, including things you won't find anywhere else.</p>
          <span className="px-6 py-2 rounded-full border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition">Browse homes</span>
        </Link>
        {/* Sell a home */}
        <Link to="/list-property" className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100 hover:shadow-xl transition-all duration-300">
          <svg className="w-16 h-16 mb-4 text-green-600" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V3.5L12.5 1V9H17ZM17 9H20.5V13.5L17 17V9ZM17 9L12.5 12.5L17 17H20.5V13.5L17 9Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 9L12.5 12.5L17 17H20.5V13.5L17 9Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17h10" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17V3.5L12.5 1V9H7M7 17L3.5 13.5V20.5L7 17Z" />
          </svg>
          <h2 className="text-xl font-bold mb-2 text-gray-900">Sell a home</h2>
          <p className="text-gray-600 mb-4">No matter what path you take to sell your home, we can help you navigate a successful sale.</p>
          <span className="px-6 py-2 rounded-full border border-green-600 text-green-600 font-semibold hover:bg-green-50 transition">See your options</span>
        </Link>
        {/* Rent a home */}
        <Link to="/property-search?type=rent" className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100 hover:shadow-xl transition-all duration-300">
          <svg className="w-16 h-16 mb-4 text-purple-600" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 17l4 4 4-4m0 0V3m0 14H4a2 2 0 01-2-2V7a2 2 0 012-2h16a2 2 0 012 2v8a2 2 0 01-2 2z" />
          </svg>
          <h2 className="text-xl font-bold mb-2 text-gray-900">Rent a home</h2>
          <p className="text-gray-600 mb-4">We're creating a seamless online experience—from shopping on the largest rental network, to applying, to paying rent.</p>
          <span className="px-6 py-2 rounded-full border border-purple-600 text-purple-600 font-semibold hover:bg-purple-50 transition">Find rentals</span>
        </Link>
      </div>

      {/* Featured Properties Section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Properties</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {mockProperties.slice(0, 3).map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home; 