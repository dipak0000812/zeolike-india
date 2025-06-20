import React from 'react';
import MapEmbed from './MapEmbed';

const Listings = ({ location }) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <MapEmbed initialLocation={location} />
    </div>
  );
};

export default Listings;
