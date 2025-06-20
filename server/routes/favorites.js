const express = require('express');
const router = express.Router();
const Favorite = require('../models/Favorite');
const Listing = require('../models/Listing'); // Needed for populate
const { auth } = require('../middleware/auth'); // Assuming you have an auth middleware

// @route   POST /api/favorites
// @desc    Add a listing to user's favorites
// @access  Private
router.post('/', auth, async (req, res) => {
  const { listingId } = req.body;
  const userId = req.user.id; // User ID from auth middleware

  try {
    const newFavorite = new Favorite({
      user: userId,
      listing: listingId,
    });

    await newFavorite.save();
    res.status(201).json(newFavorite);
  } catch (error) {
    // Check for duplicate key error (user already favorited this listing)
    if (error.code === 11000) {
      return res.status(400).json({ msg: 'Listing already in favorites.' });
    }
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/favorites/user/:userId
// @desc    Get all favorite listings for a specific user
// @access  Private (or Public if user ID is validated)
router.get('/user/:userId', auth, async (req, res) => {
  try {
    // Ensure the request user matches the userId in params, or is admin
    if (req.user.id !== req.params.userId) {
      return res.status(403).json({ msg: 'Not authorized to view these favorites.' });
    }
    
    const favorites = await Favorite.find({ user: req.params.userId }).populate('listing');
    res.json(favorites);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/favorites/:id
// @desc    Remove a listing from favorites by favorite ID
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const favorite = await Favorite.findById(req.params.id);

    if (!favorite) {
      return res.status(404).json({ msg: 'Favorite not found.' });
    }

    // Ensure user owns the favorite
    if (favorite.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized.' });
    }

    await favorite.deleteOne();
    res.json({ msg: 'Favorite removed successfully.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/favorites/:listingId/:userId
// @desc    Remove a listing from favorites by listingId and userId (alternative delete)
// @access  Private
router.delete('/:listingId/:userId', auth, async (req, res) => {
  try {
    const { listingId, userId } = req.params;

    // Ensure the request user matches the userId in params
    if (req.user.id !== userId) {
      return res.status(401).json({ msg: 'User not authorized.' });
    }

    const favorite = await Favorite.findOne({ user: userId, listing: listingId });

    if (!favorite) {
      return res.status(404).json({ msg: 'Favorite not found.' });
    }

    await favorite.deleteOne();
    res.json({ msg: 'Favorite removed successfully.' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; 