import React from 'react';
import MapEmbed from '../components/MapEmbed';

const MapPage = () => {
  return (
    <div>
      <MapEmbed initialLocation={{ lat: 19.6012, lng: 74.6473 }} />
    </div>
  );
};

export default MapPage;
