import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { listingsAPI } from '../services/api';
import { useAuth } from '../App';

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    beds: '',
    baths: '',
    sqft: '',
    features: [],
    propertyType: 'sale', // default to sale
    phone: '',
    email: '',
    imageURLs: [], // For existing image URLs
    newImages: [], // For new image file uploads
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const data = await listingsAPI.getById(id);
        if (user && data.owner !== user.id) {
          // Optionally redirect or show error if user is not the owner
          setError('You are not authorized to edit this listing.');
          setLoading(false);
          return;
        }
        setFormData({
          title: data.title || '',
          description: data.description || '',
          price: data.price || '',
          location: data.location || '',
          beds: data.beds || '',
          baths: data.baths || '',
          sqft: data.sqft || '',
          features: data.features || [],
          propertyType: data.propertyType || 'sale',
          phone: data.phone || '',
          email: data.email || '',
          imageURLs: data.imageURLs || [],
          newImages: [], // Clear new images on load
        });
      } catch (err) {
        console.error('Error fetching listing:', err);
        setError('Failed to load listing for editing.');
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id, user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        features: checked
          ? [...prev.features, value]
          : prev.features.filter(feature => feature !== value),
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({
      ...prev,
      newImages: Array.from(e.target.files),
    }));
  };

  const handleRemoveExistingImage = (urlToRemove) => {
    setFormData(prev => ({
      ...prev,
      imageURLs: prev.imageURLs.filter(url => url !== urlToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSubmissionStatus(null);

    const dataToSend = new FormData();
    for (const key in formData) {
      if (key === 'features') {
        formData[key].forEach(feature => dataToSend.append('features', feature));
      } else if (key === 'newImages') {
        formData[key].forEach(file => dataToSend.append('newImages', file));
      } else if (key !== 'imageURLs') { // Don't send existing imageURLs in FormData directly
        dataToSend.append(key, formData[key]);
      }
    }
    // Send existing imageURLs separately as a JSON string, or handle on backend
    // For simplicity, we'll let the backend process the array directly if sent as JSON
    // Or pass them as a separate field and backend merges
    dataToSend.append('imageURLsJson', JSON.stringify(formData.imageURLs));

    try {
      const updatedListing = await listingsAPI.update(id, dataToSend);
      setSubmissionStatus('Listing updated successfully!');
      navigate(`/property/${updatedListing._id}`); // Redirect to updated property page
    } catch (err) {
      console.error('Error updating listing:', err);
      setError(err.response?.data?.message || 'Failed to update listing. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div></div>;
  }

  if (error && error !== 'You are not authorized to edit this listing.') {
    return <div className="min-h-screen flex items-center justify-center text-red-600 font-bold text-xl">Error: {error}</div>;
  }

  if (error === 'You are not authorized to edit this listing.') {
    return <div className="min-h-screen flex items-center justify-center text-red-600 font-bold text-xl">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Property Listing</h1>

        {submissionStatus && (
          <div className={`p-4 mb-6 rounded-md ${submissionStatus.includes('successfully') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
            {submissionStatus}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">Property Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (INR)</label>
              <input
                type="number"
                name="price"
                id="price"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                id="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              ></textarea>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location (e.g., City, State)</label>
              <input
                type="text"
                name="location"
                id="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="beds" className="block text-sm font-medium text-gray-700">Number of Beds</label>
              <input
                type="number"
                name="beds"
                id="beds"
                value={formData.beds}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="baths" className="block text-sm font-medium text-gray-700">Number of Baths</label>
              <input
                type="number"
                name="baths"
                id="baths"
                value={formData.baths}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="sqft" className="block text-sm font-medium text-gray-700">Area (sq.ft)</label>
              <input
                type="number"
                name="sqft"
                id="sqft"
                value={formData.sqft}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label htmlFor="propertyType" className="block text-sm font-medium text-gray-700">Property Type</label>
              <select
                name="propertyType"
                id="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Contact Phone</label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                pattern="[0-9]{10}"
                title="Please enter a valid 10-digit phone number"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Contact Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Features Checkboxes */}
          <div className="mt-6">
            <span className="text-base font-medium text-gray-900">Features</span>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[ 'Swimming Pool', 'Gym', 'Balcony', 'Garden', 'Parking', 'Security', 'Furnished', 'Pet Friendly', 'Clubhouse', 'Power Backup' ].map(feature => (
                <div key={feature} className="flex items-center">
                  <input
                    id={feature}
                    name="features"
                    type="checkbox"
                    value={feature}
                    checked={formData.features.includes(feature)}
                    onChange={handleChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor={feature} className="ml-3 text-sm text-gray-700">
                    {feature}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Existing Images Display and Removal */}
          {formData.imageURLs.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Existing Images</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {formData.imageURLs.map((url) => (
                  <div key={url} className="relative group rounded-lg overflow-hidden shadow-md">
                    <img src={url} alt="Listing" className="w-full h-32 object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemoveExistingImage(url)}
                      className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove image"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* New Image Upload */}
          <div className="mt-6">
            <label htmlFor="newImages" className="block text-sm font-medium text-gray-700">Upload New Images</label>
            <input
              type="file"
              name="newImages"
              id="newImages"
              multiple
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            <p className="mt-2 text-xs text-gray-500">Maximum 5 files. JPG, PNG, GIF, WEBP only.</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Update Listing'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditListing; 