import React from 'react';
import { FaHome, FaUsers, FaChartLine, FaShieldAlt, FaRupeeSign, FaMapMarkedAlt } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Zeolike</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            India's trusted real estate platform, making property transactions simple, transparent, and accessible for everyone.
          </p>
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <p className="text-gray-600 mb-6">
            Founded in 2024, Zeolike emerged from a simple yet powerful vision: to transform India's real estate landscape. 
            We recognized the challenges faced by property seekers and owners in navigating the complex Indian real estate market.
            Our platform was born to bridge this gap, bringing transparency and efficiency to property transactions across India.
          </p>
          <p className="text-gray-600">
            Today, we're proud to serve thousands of users across major Indian cities, helping them find their perfect homes 
            and make informed real estate decisions.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            At Zeolike, we're committed to revolutionizing the Indian real estate industry by making property
            transactions seamless, transparent, and accessible to everyone. We believe that finding your
            dream home should be an exciting journey, not a stressful experience.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaHome className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600">Leading with cutting-edge technology for Indian real estate</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Trust</h3>
              <p className="text-gray-600">Building lasting relationships with verified partners</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <FaChartLine className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
              <p className="text-gray-600">Delivering exceptional service every time</p>
            </div>
          </div>
        </div>

        {/* Why Zeolike Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why Choose Zeolike?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <FaMapMarkedAlt className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Smart Location Search</h3>
                <p className="text-gray-600">Advanced map-based search with neighborhood insights</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <FaRupeeSign className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">EMI Calculator</h3>
                <p className="text-gray-600">Easy-to-use EMI calculator with bank offers</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <FaUsers className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Verified Listings</h3>
                <p className="text-gray-600">All properties verified by our expert team</p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden bg-gray-200">
                <img
                  src="/images/team/dipak.jpg"
                  alt="Dipak Dhangar"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150';
                  }}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Dipak Dhangar</h3>
              <p className="text-gray-600">Founder & CEO</p>
              <p className="text-sm text-gray-500 mt-2">Visionary leader </p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden bg-gray-200">
                <img
                  src="/images/team/yash.jpg"
                  alt="Yash Mali"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150';
                  }}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Yash Mali</h3>
              <p className="text-gray-600">Head of Operations</p>
              <p className="text-sm text-gray-500 mt-2"></p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full mx-auto mb-4 overflow-hidden bg-gray-200">
                <img
                  src="/images/team/bhavesh.jpg"
                  alt="Bhavesh Jadhav"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/150';
                  }}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Bhavesh Jadhav</h3>
              <p className="text-gray-600">Lead Developer</p>
              <p className="text-sm text-gray-500 mt-2">Full-stack developer with expertise in real estate tech</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 