import React, { useState, useEffect } from 'react';
import { listingsAPI, authAPI } from '../services/api';
import { useAuth } from '../App';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('listings');
  const [allListings, setAllListings] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loadingListings, setLoadingListings] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [errorListings, setErrorListings] = useState(null);
  const [errorUsers, setErrorUsers] = useState(null);

  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (authLoading) return;

    if (!user || user.role !== 'admin') {
      navigate('/login'); // Redirect non-admins
      return;
    }

    // Fetch all listings
    const fetchAllListings = async () => {
      setLoadingListings(true);
      try {
        const data = await listingsAPI.getAll(); // Assuming getAll can be called by admin without userId filter
        setAllListings(data);
        setErrorListings(null);
      } catch (err) {
        console.error('Error fetching all listings:', err);
        setErrorListings('Failed to fetch all listings.');
      } finally {
        setLoadingListings(false);
      }
    };

    // Fetch all users
    const fetchAllUsers = async () => {
      setLoadingUsers(true);
      try {
        // TODO: Create a new API endpoint in authRouter for admin to get all users
        // For now, this will be a placeholder or throw an error until implemented
        // const data = await authAPI.getAllUsers(); 
        setAllUsers([]); // Placeholder for now
        setErrorUsers(null);
      } catch (err) {
        console.error('Error fetching all users:', err);
        setErrorUsers('Failed to fetch all users.');
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchAllListings();
    fetchAllUsers();
  }, [user, authLoading, navigate]);

  const handleVerifyListing = async (listingId, currentStatus) => {
    // TODO: Implement backend API call for verifying listing
    console.log(`Verifying listing ${listingId}, current status: ${currentStatus}`);
    // After successful API call, update allListings state
    setAllListings(prev => prev.map(listing =>
      listing._id === listingId ? { ...listing, verified: !currentStatus } : listing
    ));
  };

  const handleToggleUserStatus = async (userId, currentStatus) => {
    // TODO: Implement backend API call for activating/deactivating user
    console.log(`Toggling user ${userId} status to ${!currentStatus}`);
    // After successful API call, update allUsers state
    setAllUsers(prev => prev.map(u =>
      u._id === userId ? { ...u, isActive: !currentStatus } : u
    ));
  };

  const renderTabContent = () => {
    if (authLoading) {
      return (
        <div className="text-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading authentication data...</p>
        </div>
      );
    }

    if (!user || user.role !== 'admin') {
      return (
        <div className="text-center py-10">
          <p className="text-red-600 font-bold text-xl">Access Denied: You are not authorized to view this page.</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'listings':
        if (loadingListings) {
          return (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading all listings...</p>
            </div>
          );
        }
        if (errorListings) {
          return (
            <div className="bg-red-50 p-4 rounded-md text-center">
              <p className="text-red-700">{errorListings}</p>
            </div>
          );
        }
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">All Listings</h3>
            {allListings.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Owner</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Verified</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {allListings.map(listing => (
                      <tr key={listing._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{listing.title}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{listing.location}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">₹{listing.price.toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{listing.ownerName || listing.owner}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            listing.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {listing.verified ? 'Yes' : 'No'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleVerifyListing(listing._id, listing.verified)}
                            className={`text-indigo-600 hover:text-indigo-900 ${
                              loadingListings ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            disabled={loadingListings}
                          >
                            {listing.verified ? 'Unverify' : 'Verify'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600">No listings found.</p>
            )}
          </div>
        );

      case 'users':
        if (loadingUsers) {
          return (
            <div className="text-center py-10">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading all users...</p>
            </div>
          );
        }
        if (errorUsers) {
          return (
            <div className="bg-red-50 p-4 rounded-md text-center">
              <p className="text-red-700">{errorUsers}</p>
            </div>
          );
        }
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">All Users</h3>
            {allUsers.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 shadow-sm rounded-lg overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {allUsers.map(user => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.role}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.isActive ? 'Active' : 'Banned'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleToggleUserStatus(user._id, user.isActive)}
                            className={`text-red-600 hover:text-red-900 ${
                              loadingUsers ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                            disabled={loadingUsers}
                          >
                            {user.isActive ? 'Ban' : 'Unban'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600">No users found.</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
          {user && (
            <p className="text-gray-600 mb-6">Welcome, Admin {user.name} ({user.email})</p>
          )}

          <div className="mb-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('listings')}
                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'listings'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Listings Management
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'users'
                    ? 'border-indigo-500 text-indigo-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                User Management
              </button>
            </nav>
          </div>

          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 