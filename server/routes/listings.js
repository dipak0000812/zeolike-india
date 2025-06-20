const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');
const { auth } = require('../middleware/auth'); // Import auth middleware

// @route   POST /api/listings
// @desc    Add new listing
// @access  Public (will be private after auth)
router.post('/', async (req, res) => {
  try {
    const listing = new Listing({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      location: req.body.location,
      beds: req.body.beds,
      baths: req.body.baths,
      sqft: req.body.sqft,
      features: req.body.features,
      owner: req.body.owner,
      phone: req.body.phone,
      email: req.body.email,
      imageURLs: req.body.imageURLs,
      verified: false
    });

    const newListing = await listing.save();
    res.status(201).json(newListing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   GET /api/listings
// @desc    Get all listings
// @access  Public
router.get('/', async (req, res) => {
  try {
    let query = {};
    if (req.query.userId) {
      query.owner = req.query.userId;
    }
    const listings = await Listing.find(query);
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/listings/:id
// @desc    Get single listing by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/listings/:id
// @desc    Update a listing
// @access  Public (will be private after auth)
router.put('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    Object.assign(listing, req.body);
    const updatedListing = await listing.save();
    res.json(updatedListing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/listings/:id
// @desc    Delete a listing
// @access  Public (will be private after auth)
router.delete('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    await listing.deleteOne();
    res.json({ message: 'Listing deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/listings/:id/verify
// @desc    Verify/Unverify a listing (Admin only)
// @access  Private (Admin)
router.put('/:id/verify', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    const { id } = req.params;
    const { verified } = req.body;

    const listing = await Listing.findByIdAndUpdate(id, { verified }, { new: true });
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.json({
      message: `Listing ${listing.title} has been ${listing.verified ? 'verified' : 'unverified'}.`,
      listing,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 