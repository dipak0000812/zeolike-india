import React, { useState } from 'react';
import PropertyCard from '../components/PropertyCard';
import { mockProperties } from '../utils/mockData';

const Listings = () => {
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    beds: '',
    baths: '',
    type: '',
  });

  // Filter logic
  const filteredProperties = mockProperties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(search.toLowerCase()) ||
      property.location.toLowerCase().includes(search.toLowerCase());
    const matchesMinPrice = !filters.minPrice || property.price >= Number(filters.minPrice);
    const matchesMaxPrice = !filters.maxPrice || property.price <= Number(filters.maxPrice);
    const matchesBeds = !filters.beds || property.beds >= Number(filters.beds);
    const matchesBaths = !filters.baths || property.baths >= Number(filters.baths);
    const matchesType = !filters.type || property.type === filters.type;
    return (
      matchesSearch &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesBeds &&
      matchesBaths &&
      matchesType
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200 py-8 px-4 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Find Your Next Home</h1>
        <form className="w-full max-w-2xl flex items-center">
          <input
            type="text"
            placeholder="Search by address, city, or ZIP code"
            className="flex-1 px-6 py-4 rounded-l-full text-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <button
            type="submit"
            className="px-6 py-4 rounded-r-full bg-blue-600 text-white font-semibold text-lg shadow hover:bg-blue-700 transition"
            onClick={e => e.preventDefault()}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
          </button>
        </form>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <aside className="md:col-span-1 bg-white rounded-2xl shadow p-6 mb-8 md:mb-0">
          <h2 className="text-lg font-bold mb-4 text-gray-900">Filters</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Min Price</label>
              <input type="number" className="w-full px-3 py-2 rounded bg-gray-100" value={filters.minPrice} onChange={e => setFilters(f => ({ ...f, minPrice: e.target.value }))} />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Max Price</label>
              <input type="number" className="w-full px-3 py-2 rounded bg-gray-100" value={filters.maxPrice} onChange={e => setFilters(f => ({ ...f, maxPrice: e.target.value }))} />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Beds</label>
              <input type="number" className="w-full px-3 py-2 rounded bg-gray-100" value={filters.beds} onChange={e => setFilters(f => ({ ...f, beds: e.target.value }))} />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Baths</label>
              <input type="number" className="w-full px-3 py-2 rounded bg-gray-100" value={filters.baths} onChange={e => setFilters(f => ({ ...f, baths: e.target.value }))} />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">Property Type</label>
              <select className="w-full px-3 py-2 rounded bg-gray-100" value={filters.type} onChange={e => setFilters(f => ({ ...f, type: e.target.value }))}>
                <option value="">Any</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Condo">Condo</option>
                <option value="Townhouse">Townhouse</option>
              </select>
            </div>
          </div>
        </aside>

        {/* Property Grid */}
        <main className="md:col-span-3">
          {filteredProperties.length === 0 ? (
            <div className="text-center text-gray-500 py-24 text-xl">No properties found matching your criteria.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Listings; 