import MapEmbed from './MapEmbed';

const NeighborhoodMap = ({ location, pointsOfInterest }) => {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <MapEmbed initialLocation={location} />
    </div>
  );
};

export default NeighborhoodMap; 