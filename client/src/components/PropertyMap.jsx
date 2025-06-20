import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';

const customIcon = new L.Icon({
  iconUrl: '/icons/house.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
});

const indiaCenter = [20.5937, 78.9629];

const PropertyMap = () => {
  const [properties, setProperties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [typeFilter, setTypeFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('/api/properties')
      .then((res) => res.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to fetch properties');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = properties;
    if (typeFilter) {
      result = result.filter((p) => p.type === typeFilter);
    }
    if (minPrice) {
      result = result.filter((p) => Number(p.price) >= Number(minPrice));
    }
    if (maxPrice) {
      result = result.filter((p) => Number(p.price) <= Number(maxPrice));
    }
    setFiltered(result);
  }, [properties, typeFilter, minPrice, maxPrice]);

  if (loading) return <div className="flex items-center justify-center h-96">Loading properties...</div>;
  if (error) return <div className="flex items-center justify-center h-96 text-red-600">{error}</div>;

  // Collect unique property types for filter dropdown
  const propertyTypes = Array.from(new Set(properties.map((p) => p.type))).filter(Boolean);

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4 p-2 bg-white rounded shadow items-end">
        <div>
          <label className="block text-sm font-medium">Type</label>
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="border rounded px-2 py-1">
            <option value="">All</option>
            {propertyTypes.map(type => (
              <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Min Price</label>
          <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="border rounded px-2 py-1 w-24" placeholder="₹" />
        </div>
        <div>
          <label className="block text-sm font-medium">Max Price</label>
          <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="border rounded px-2 py-1 w-24" placeholder="₹" />
        </div>
        <button onClick={() => { setTypeFilter(''); setMinPrice(''); setMaxPrice(''); }} className="ml-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Clear Filters</button>
      </div>

      {/* Map */}
      <div className="rounded-lg overflow-hidden shadow" style={{ height: '80vh', width: '100%' }}>
        <MapContainer center={indiaCenter} zoom={5} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <MarkerClusterGroup>
            {filtered.map((property) => (
              <Marker
                key={property._id}
                position={[property.latitude, property.longitude]}
                icon={customIcon}
              >
                <Popup minWidth={220}>
                  <div className="space-y-2">
                    {property.image && (
                      <img src={property.image} alt={property.title} className="w-full h-24 object-cover rounded" />
                    )}
                    <div>
                      <strong className="block text-lg">{property.title}</strong>
                      <span className="block text-green-700 font-bold">₹{property.price}</span>
                      {property.address && <span className="block text-gray-600 text-sm">{property.address}</span>}
                    </div>
                    <Link to={`/property/${property._id}`} className="inline-block px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">View Details</Link>
                    <button className="inline-block px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 ml-2">Contact</button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </div>
  );
};

export default PropertyMap; 