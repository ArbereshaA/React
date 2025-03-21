const Location = require("../models/Location");

// Get all locations
exports.getLocations = async (req, res) => {
  try {
    const locations = await Location.findAll(); // Assuming this method is defined in your Location model
    res.status(200).json(locations);
  } catch (error) {
    res.status(500).json({ error: "Error fetching locations" });
  }
};

// Create a new location
exports.createLocation = async (req, res) => {
  const { location_name } = req.body; // Adjust according to your model's expected input
  try {
    const newLocation = await Location.create(location_name); // Assuming this method is defined in your Location model
    res.status(201).json(newLocation);
  } catch (error) {
    res.status(500).json({ error: "Error creating location" });
  }
};

// Get location by ID
exports.getLocationById = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id); // Assuming this method is defined in your Location model
    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ error: "Error fetching location" });
  }
};

// Update location by ID
exports.updateLocation = async (req, res) => {
  const { location_name } = req.body; // Adjust according to your model's expected input
  try {
    const location = await Location.findById(req.params.id); // Assuming this method is defined in your Location model
    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }
    const updatedLocation = await Location.updateById(
      req.params.id,
      location_name
    ); // Assuming this method is defined in your Location model
    res.status(200).json(updatedLocation);
  } catch (error) {
    res.status(500).json({ error: "Error updating location" });
  }
};

// Delete location by ID
exports.deleteLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id); // Assuming this method is defined in your Location model
    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }
    await Location.deleteById(req.params.id); // Assuming this method is defined in your Location model
    res.status(200).json({ message: "Location deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting location" });
  }
};
