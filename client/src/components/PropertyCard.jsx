import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaBed, FaBath, FaRuler, FaMapMarkerAlt } from 'react-icons/fa';
import { useAuth } from '../App'; // Import useAuth
import { favoritesAPI } from '../services/api'; // Import favoritesAPI
import './PropertyCard.css';

const PropertyCard = ({ property }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { user } = useAuth(); // Get user from auth context
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState(null);
  const [loadingFavorite, setLoadingFavorite] = useState(true);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (user && property && property._id) {
        setLoadingFavorite(true);
        try {
          const userFavorites = await favoritesAPI.getFavoritesByUserId(user.id);
          const foundFavorite = userFavorites.find(fav => fav.listing._id === property._id);
          if (foundFavorite) {
            setIsFavorite(true);
            setFavoriteId(foundFavorite._id);
          } else {
            setIsFavorite(false);
            setFavoriteId(null);
          }
        } catch (err) {
          console.error('Error checking favorite status:', err);
        } finally {
          setLoadingFavorite(false);
        }
      } else {
        setIsFavorite(false);
        setFavoriteId(null);
        setLoadingFavorite(false);
      }
    };
    checkFavoriteStatus();
  }, [user, property]);

  const toggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      alert('Please log in to add favorites.');
      return;
    }

    if (loadingFavorite) return; // Prevent double clicks while checking status

    try {
      if (isFavorite) {
        // Remove from favorites
        await favoritesAPI.removeFavorite(favoriteId);
        setIsFavorite(false);
        setFavoriteId(null);
      } else {
        // Add to favorites
        const newFavorite = await favoritesAPI.addFavorite(property._id, user.id);
        setIsFavorite(true);
        setFavoriteId(newFavorite._id);
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
      alert('Failed to update favorite status. Please try again.');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Determine the image to display, with a fallback placeholder
  const displayImage = 
    (property && property.imageURLs && property.imageURLs.length > 0)
      ? property.imageURLs[0]
      : 'https://via.placeholder.com/400x300?text=No+Image+Available';

  return (
    <Link 
      to={`/property/${property._id}`}
      className="property-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="property-image-container">
        <img 
          src={displayImage} 
          alt={property.title}
          className="property-image"
        />
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={toggleFavorite}
          disabled={loadingFavorite} // Disable button while loading favorite status
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>
        {property.featured && (
          <span className="featured-badge">Featured</span>
        )}
      </div>

      <div className="property-info">
        <div className="property-price">
          {formatPrice(property.price)}
          {property.propertyType === 'rent' && <span className="per-month">/month</span>}
        </div>

        <h3 className="property-title">{property.title}</h3>

        <div className="property-location">
          <FaMapMarkerAlt />
          <span>{property.location}</span>
        </div>

        <div className="property-features">
          <div className="feature">
            <FaBed />
            <span>{property.beds} Beds</span>
          </div>
          <div className="feature">
            <FaBath />
            <span>{property.baths} Baths</span>
          </div>
          <div className="feature">
            <FaRuler />
            <span>{property.sqft} sq.ft</span>
          </div>
        </div>

        <div className={`property-description ${isHovered ? 'show' : ''}`}>
          <p>{property.description}</p>
        </div>

        <div className="property-footer">
          <span className="property-type">{property.propertyType}</span>
          <span className="property-status">{property.status || 'Available'}</span>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard; 