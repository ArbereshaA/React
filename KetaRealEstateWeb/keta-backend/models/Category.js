const pool = require("../config"); // Assuming you are using a pool from pg

const Category = {
  // Create a new category
  create: async (category_name) => {
    const res = await pool.query(
      "INSERT INTO categories (category_name) VALUES ($1) RETURNING *",
      [category_name]
    );
    return res.rows[0];
  },

  // Find all categories
  findAll: async () => {
    const res = await pool.query("SELECT * FROM categories");
    return res.rows;
  },

  // Find category by ID
  findById: async (id) => {
    const res = await pool.query("SELECT * FROM categories WHERE id = $1", [
      id,
    ]);
    return res.rows[0];
  },

  // Update category by ID
  updateById: async (id, category_name) => {
    const res = await pool.query(
      "UPDATE categories SET category_name = $1 WHERE id = $2 RETURNING *",
      [category_name, id]
    );
    return res.rows[0];
  },

  // Delete category by ID
  deleteById: async (id) => {
    const res = await pool.query(
      "DELETE FROM categories WHERE id = $1 RETURNING *",
      [id]
    );
    return res.rows[0];
  },
};

module.exports = Category;
