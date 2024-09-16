const Place = require('../models/place');

// Get all places
exports.getAllPlaces = async (req, res) => {
  try {
    const places = await Place.find();
    res.status(200).json(places);
  } catch (err) {
    console.error('Error fetching places:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get a single place by ID
exports.getPlaceByID = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id);
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }
    res.status(200).json(place);
  } catch (err) {
    console.error('Error fetching place by ID:', err);
    res.status(500).json({ message: err.message });
  }
};

// Create a new place
exports.createPlace = async (req, res) => {
  try {
    const {
      name,
      description,
      address,
      latitude,
      longitude,
      googleMapsUrl,
      category,
      rating
    } = req.body;

    const newPlace = new Place({ 
      name,
      description,
      address,
      latitude,
      longitude,
      googleMapsUrl,
      category,
      rating
    });

    const savedPlace = await newPlace.save();
    res.status(201).json(savedPlace);
  } catch (err) {
    console.error('Error creating place:', err);
    res.status(500).json({ message: err.message });
  }
};

// Update a place by ID
exports.updatePlace = async (req, res) => {
  try {
    const {
      name,
      description,
      address,
      latitude,
      longitude,
      googleMapsUrl,
      category,
      rating
    } = req.body;

    const updatedPlace = await Place.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        address,
        latitude,
        longitude,
        googleMapsUrl,
        category,
        rating
      },
      { new: true } // Return the updated document
    );

    if (!updatedPlace) {
      return res.status(404).json({ message: 'Place not found' });
    }

    res.status(200).json(updatedPlace);
  } catch (err) {
    console.error('Error updating place:', err);
    res.status(500).json({ message: err.message });
  }
};

// Delete a place by ID
exports.deletePlace = async (req, res) => {
  try {
    const deletedPlace = await Place.findByIdAndDelete(req.params.id);

    if (!deletedPlace) {
      return res.status(404).json({ message: 'Place not found' });
    }

    res.status(200).json({ message: 'Place deleted successfully' });
  } catch (err) {
    console.error('Error deleting place:', err);
    res.status(500).json({ message: err.message });
  }
};
