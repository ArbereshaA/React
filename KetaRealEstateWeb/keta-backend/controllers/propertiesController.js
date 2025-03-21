const Property = require("../models/Property");
const pool = require("../config");
const fs = require("fs");
const path = require("path");

exports.uploadPhotos = (req, res) => {
  const photos = req.files["photos"]
    ? req.files["photos"].map((file) => file.filename)
    : [];
  const floor_photos = req.files["floor_photos"]
    ? req.files["floor_photos"].map((file) => file.filename)
    : [];

  res.status(200).json({
    photos,
    floor_photos,
  });
};

exports.createProperty = async (req, res) => {
  const {
    category_id,
    location_id,
    type,
    price,
    minarea,
    maxarea,
    bathroom,
    bedroom,
    properties_title,
    properties_description,
    floor_description,
    nearby,
    currency,
  } = req.body;
  const photos = req.body.photos || []; // Expecting array of filenames from frontend
  console.log("files  names", req.body.floor_photos);
  const floor_photos = req.body.floor_photos || [];

  try {
    const newProperty = await Property.create(
      category_id,
      location_id,
      photos,
      type,
      price,
      minarea,
      maxarea,
      bathroom,
      bedroom,
      properties_title,
      properties_description,
      floor_description,
      floor_photos,
      nearby,
      currency
    );
    res.status(201).json(newProperty);
  } catch (error) {
    console.error("Error creating property:", error);
    res.status(500).json({ message: "Failed to create property" });
  }
};

// Get all properties with category and location
exports.getProperties = async (req, res) => {
  try {
    const query = `
      SELECT p.*, c.category_name, l.location_name
      FROM properties p
      JOIN categories c ON p.category_id = c.id
      JOIN locations l ON p.location_id = l.id
      ORDER BY p.created_at DESC
    `;
    const properties = await pool.query(query);

    res.status(200).json(properties.rows); // Send the data to the frontend
  } catch (error) {
    console.error("Error fetching properties:", error);
    res.status(500).json({ error: "Error fetching properties" });
  }
};

// Fetch a property by ID along with category and location
exports.getPropertyById = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      SELECT p.*, c.category_name, l.location_name
      FROM properties p
      JOIN categories c ON p.category_id = c.id
      JOIN locations l ON p.location_id = l.id
      WHERE p.id = $1
    `;
    const result = await pool.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(result.rows[0]); // Send the property with category and location to the frontend
  } catch (error) {
    console.error("Error fetching property:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch property", error: error.message });
  }
};

// Update a property

exports.updateProperty = async (req, res) => {
  const { id } = req.params;

  // Collect form data
  const {
    category_id,
    location_id,
    type,
    price,
    nearby,
    minarea,
    maxarea,
    bathroom,
    bedroom,
    properties_title,
    properties_description,
    floor_description,
    currency,
  } = req.body;

  // Handle photos upload
  const photos = req.body.photos || []; // Expecting array of filenames from frontend
  console.log("files  names", req.body.floor_photos);
  const floor_photos = req.body.floor_photos || [];

  try {
    // Assuming you have a method to update the property in your database
    const updatedProperty = await Property.updateById(
      id,
      category_id,
      location_id,
      photos,
      floor_photos,
      type,
      price,
      nearby,
      minarea,
      maxarea,
      bathroom,
      bedroom,
      properties_title,
      properties_description,
      floor_description,
      currency
    );

    if (!updatedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.status(200).json(updatedProperty);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update property", error: error.message });
  }
};

// Delete a property by ID
exports.deleteProperty = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProperty = await Property.deleteById(id);
    if (!deletedProperty) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(deletedProperty);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete property", error: error.message });
  }
};
