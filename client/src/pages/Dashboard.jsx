import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import { useAuth } from '../App'; // Import useAuth hook
import { listingsAPI, favoritesAPI } from '../services/api'; // Import listingsAPI and favoritesAPI

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('properties');
  const { user, loading: authLoading } = useAuth(); // Get user and loading state from auth context
  const [userListings, setUserListings] = useState([]); // State for user's own listings
  const [listingsLoading, setListingsLoading] = useState(true);
  const [listingsError, setListingsError] = useState(null);

  const [savedProperties, setSavedProperties] = useState([]); // State for user's saved listings
  const [savedLoading, setSavedLoading] = useState(true);
  const [savedError, setSavedError] = useState(null);

  useEffect(() => {
    if (user && !authLoading) {
      const fetchUserListings = async () => {
        setListingsLoading(true);
        try {
          const data = await listingsAPI.getAll({ userId: user.id }); // Fetch listings for the current user
          setUserListings(data);
          setListingsError(null);
        } catch (err) {
          console.error('Error fetching user listings:', err);
          setListingsError('Failed to fetch your listings.');
        } finally {
          setListingsLoading(false);
        }
      };
      fetchUserListings();

      const fetchSavedProperties = async () => {
        setSavedLoading(true);
        try {
          const data = await favoritesAPI.getFavoritesByUserId(user.id);
          // favoritesAPI returns an array of { _id, user, listing: {...} }
          // We only need the listing object to pass to PropertyCard
          setSavedProperties(data.map(fav => fav.listing));
          setSavedError(null);
        } catch (err) {
          console.error('Error fetching saved properties:', err);
          setSavedError('Failed to fetch saved properties.');
        } finally {
          setSavedLoading(false);
        }
      };
      fetchSavedProperties();
    } else if (!user && !authLoading) {
      // If not logged in after auth check, clear listings and saved properties
      setUserListings([]);
      setListingsLoading(false);
      setSavedProperties([]);
      setSavedLoading(false);
    }
  }, [user, authLoading]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await listingsAPI.delete(id);
        setUserListings(prev => prev.filter(listing => listing._id !== id));
      } catch (err) {
        console.error('Error deleting listing:', err);
        alert('Failed to delete listing. Please try again.');
      }
    }
  };

  const renderTabContent = () => {
    if (authLoading || listingsLoading) {
      return (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading {activeTab === 'properties' ? 'your properties' : 'data'}...</p>
        </div>
      );
    }

    if (listingsError) {
      return (
        <div className="bg-red-50 p-4 rounded-md text-center">
          <p className="text-red-700">{listingsError}</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'properties':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">My Properties</h3>
              <Link
                to="/list-property"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                List New Property
              </Link>
            </div>
            {userListings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userListings.map((property) => (
                  <div key={property._id} className="relative">
                    <PropertyCard property={property} />
                    <div className="absolute bottom-4 right-4 flex space-x-2">
                      <Link
                        to={`/edit-listing/${property._id}`}
                        className="px-3 py-1 bg-yellow-500 text-white text-xs rounded hover:bg-yellow-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(property._id)}
                        className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">You haven't listed any properties yet. Click "List New Property" to get started!</p>
            )}
          </div>
        );

      case 'saved':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Saved Properties</h3>
            {savedProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedProperties.map((property) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            ) : (
              <p className="text-gray-600">You haven't saved any properties yet.</p>
            )}
          </div>
        );

      case 'profile':
        return (
          <div className="space-y-6">
            <div className="bg-white shadow sm:rounded-lg p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Profile Information</h3>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full name</label>
                  <p className="mt-1 text-lg text-gray-900">{user?.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <p className="mt-1 text-lg text-gray-900">{user?.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <p className="mt-1 text-lg text-gray-900">{user?.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Member since</label>
                  <p className="mt-1 text-lg text-gray-900">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Edit Profile
                </button>
              </div>
            </div>

            <div className="bg-white shadow sm:rounded-lg p-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">Change Password</h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">Current password</label>
                  <input
                    type="password"
                    id="current-password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">New password</label>
                  <input
                    type="password"
                    id="new-password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm new password</label>
                  <input
                    type="password"
                    id="confirm-password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>
          {user && !authLoading && (
            <p className="text-gray-600 mb-6">Welcome, {user.name} ({user.email})</p>
          )}

          <div className="mb-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('properties')}
                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'properties'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Properties
              </button>
              <button
                onClick={() => setActiveTab('saved')}
                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'saved'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Saved Properties
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'profile'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-300'
                }`}
              >
                Profile
              </button>
            </nav>
          </div>

          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;