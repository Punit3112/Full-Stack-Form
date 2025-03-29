const express = require('express');
const router = express.Router();
const Claim = require('../models/claim');

// GET /api/claims - Get all claims
router.get('/', async (req, res) => {
  try {
    const claims = await Claim.getAll();
    res.status(200).json(claims);
  } catch (error) {
    console.error('Error fetching claims:', error);
    res.status(500).json({ error: 'Failed to fetch claims' });
  }
});

// GET /api/claims/:id - Get a specific claim
router.get('/:id', async (req, res) => {
  try {
    const claim = await Claim.getById(req.params.id);
    if (!claim) {
      return res.status(404).json({ error: 'Claim not found' });
    }
    res.status(200).json(claim);
  } catch (error) {
    console.error('Error fetching claim:', error);
    res.status(500).json({ error: 'Failed to fetch claim' });
  }
});

// POST /api/claims - Create a new claim
router.post('/', async (req, res) => {
  try {
    // Validate request data
    const validationErrors = await Claim.validateClaimData(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    // Create claim
    const result = await Claim.create(req.body);
    res.status(201).json({
      message: 'Claim created successfully',
      claimId: result.insertId
    });
  } catch (error) {
    console.error('Error creating claim:', error);
    res.status(500).json({ error: 'Failed to create claim' });
  }
});

// PUT /api/claims/:id - Update a claim
router.put('/:id', async (req, res) => {
  try {
    // Check if claim exists
    const existingClaim = await Claim.getById(req.params.id);
    if (!existingClaim) {
      return res.status(404).json({ error: 'Claim not found' });
    }

    // Validate request data
    const validationErrors = await Claim.validateClaimData(req.body);
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }

    // Update claim
    const result = await Claim.update(req.params.id, req.body);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Claim not found' });
    }
    res.status(200).json({ message: 'Claim updated successfully' });
  } catch (error) {
    console.error('Error updating claim:', error);
    res.status(500).json({ error: 'Failed to update claim' });
  }
});

// DELETE /api/claims/:id - Delete a claim
router.delete('/:id', async (req, res) => {
  try {
    const result = await Claim.delete(req.params.id);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Claim not found' });
    }
    res.status(200).json({ message: 'Claim deleted successfully' });
  } catch (error) {
    console.error('Error deleting claim:', error);
    res.status(500).json({ error: 'Failed to delete claim' });
  }
});

module.exports = router; 