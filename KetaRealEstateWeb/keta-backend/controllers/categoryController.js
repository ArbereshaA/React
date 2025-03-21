const Category = require("../models/Category");

// Get all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.findAll(); // Correct method from model
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: "Error fetching categories" });
  }
};

// Create a new category
exports.createCategory = async (req, res) => {
  const { category_name } = req.body;
  try {
    const newCategory = await Category.create(category_name); // Correct method from model
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Error creating category" });
  }
};

// Get category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id); // Correct method from model
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Error fetching category" });
  }
};

// Update category by ID
exports.updateCategory = async (req, res) => {
  const { category_name } = req.body;
  try {
    let category = await Category.findById(req.params.id); // Correct method from model
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    category = await Category.updateById(req.params.id, category_name); // Update in model
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: "Error updating category" });
  }
};

// Delete category by ID
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id); // Correct method from model
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    await Category.deleteById(req.params.id); // Correct method from model
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting category" });
  }
};
