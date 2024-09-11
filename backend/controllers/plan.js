const Planning = require('../models/plan');

// Get all planning
exports.getAllPlannings = async (req, res) => {
  try {
    const plannings = await Planning.find().populate('userID');
    res.status(200).json(plannings);
  } catch (err) {
    console.error('Error fetching plannings:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get planning by ID
exports.getPlanningByID = async (req, res) => {
  try {
    const planning = await Planning.findById(req.params.id).populate('userID');
    if (!planning) {
      return res.status(404).json({ message: 'Planning not found' });
    }
    res.status(200).json(planning);
  } catch (err) {
    console.error('Error fetching planning by ID:', err);
    res.status(500).json({ message: err.message });
  }
};

// Create a new planning
exports.createPlanning = async (req, res) => {
  try {
    const {
      tripName,
      startDate,
      endDate,
      description,
      budget,
      status,
      userID
    } = req.body;

    const newPlanning = new Planning({
      tripName,
      startDate,
      endDate,
      description,
      budget,
      status,
      userID
    });

    const savedPlanning = await newPlanning.save();
    res.status(201).json(savedPlanning);
  } catch (err) {
    console.error('Error creating planning:', err);
    res.status(500).json({ message: err.message });
  }
};

// Update a planning
exports.updatePlanning = async (req, res) => {
  try {
    const updatedPlanning = await Planning.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPlanning) {
      return res.status(404).json({ message: 'Planning not found' });
    }
    res.status(200).json(updatedPlanning);
  } catch (err) {
    console.error('Error updating planning:', err);
    res.status(500).json({ message: err.message });
  }
};

// Delete a planning
exports.deletePlanning = async (req, res) => {
  try {
    const deletedPlanning = await Planning.findByIdAndDelete(req.params.id);
    if (!deletedPlanning) {
      return res.status(404).json({ message: 'Planning not found' });
    }
    res.status(200).json({ message: 'Planning deleted successfully' });
  } catch (err) {
    console.error('Error deleting planning:', err);
    res.status(500).json({ message: err.message });
  }
};
