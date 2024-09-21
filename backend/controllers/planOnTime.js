const PlanOntime = require('../models/planOnTime');

// Get all PlanOntimes
exports.getAllPlanOntimes = async (req, res) => {
  try {
    const planOntimes = await PlanOntime.find().populate('reviewID locationID planningID');
    res.status(200).json(planOntimes);
  } catch (err) {
    console.error('Error fetching PlanOntimes:', err);
    res.status(500).json({ message: err.message });
  }
};

// Get PlanOntime by planningID
exports.getPlanOntimeByPlanningID = async (req, res) => {
  try {
    const planningID = req.params.id;
    const planOntimes = await PlanOntime.find({ planningID: planningID });
    
    if (planOntimes.length === 0) {
      return res.status(404).json({ message: 'No PlanOntime found for this planningID' });
    }
    
    res.status(200).json(planOntimes);
  } catch (err) {
    console.error('Error fetching PlanOntime by planningID:', err);
    res.status(500).json({ message: err.message });
  }
};


// Create a new PlanOntime
exports.createPlanOntime = async (req, res) => {
  try {
    const newPlanOntime = new PlanOntime(req.body);

    // Save the new PlanOntime to the database
    const savedPlanOntime = await newPlanOntime.save();
    res.status(201).json(savedPlanOntime);
  } catch (err) {
    console.error('Error creating PlanOntime:', err);
    res.status(500).json({ message: err.message });
  }
};

// Update PlanOntime by ID
exports.updatePlanOntime = async (req, res) => {
  try {
    const updatedPlanOntime = await PlanOntime.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true // Ensure validation is applied
    });

    if (!updatedPlanOntime) {
      return res.status(404).json({ message: 'PlanOntime not found' });
    }

    res.status(200).json(updatedPlanOntime);
  } catch (err) {
    console.error('Error updating PlanOntime:', err);
    res.status(500).json({ message: err.message });
  }
};

// Delete PlanOntime by ID
exports.deletePlanOntime = async (req, res) => {
  try {
    const deletedPlanOntime = await PlanOntime.findByIdAndDelete(req.params.id);

    if (!deletedPlanOntime) {
      return res.status(404).json({ message: 'PlanOntime not found' });
    }

    res.status(200).json({ message: 'PlanOntime deleted successfully' });
  } catch (err) {
    console.error('Error deleting PlanOntime:', err);
    res.status(500).json({ message: err.message });
  }
};
