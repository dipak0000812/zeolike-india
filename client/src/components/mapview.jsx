 // MapView.jsx
import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const customIcon = new L.Icon({
  iconUrl: '/icons/house.png',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const MapView = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const popupRefs = useRef({});
  const mapRef = useRef();

  useEffect(() => {
    axios.get('http://localhost:5000/api/properties')
      .then(res => {
        setProperties(res.data);
        setFilteredProperties(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (selectedProperty && mapRef.current) {
      const { lat, lng } = selectedProperty.location;
      mapRef.current.flyTo([lat, lng], 16);
      const popup = popupRefs.current[selectedProperty._id];
      if (popup) popup.openPopup();
    }
  }, [selectedProperty]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    const filtered = properties.filter(p =>
      p.location.city.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProperties(filtered);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 h-screen overflow-y-auto border-r p-4">
        <h2 className="text-xl font-bold mb-2">Search by City</h2>
        <input
          type="text"
          value={search}
          onChange={handleSearch}
          className="w-full p-2 mb-4 border rounded"
          placeholder="Enter city name..."
        />
        {filteredProperties.map((property) => (
          <div
            key={property._id}
            className="border p-2 mb-2 cursor-pointer hover:bg-gray-100"
            onClick={() => setSelectedProperty(property)}
          >
            <h3 className="font-semibold">{property.name}</h3>
            <p>₹ {property.price.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Map */}
      <div className="w-3/4 h-screen">
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={5}
          style={{ height: "100%", width: "100%" }}
          whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />

          <MarkerClusterGroup>
            {filteredProperties.map((property) => (
              <Marker
                key={property._id}
                position={[property.location.lat, property.location.lng]}
                icon={customIcon}
                ref={(ref) => (popupRefs.current[property._id] = ref)}
              >
                <Popup>
                  <strong>{property.name}</strong><br />
                  ₹ {property.price.toLocaleString()}<br />
                  <img src={property.image} alt="" width="100" />
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    </div>
  );
};

export default MapView;


