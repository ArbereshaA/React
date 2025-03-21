const pool = require("../config"); // Assuming you are using a pool from pg

const Location = {
  // Create a new location
  create: async (location_name) => {
    const res = await pool.query(
      "INSERT INTO locations (location_name) VALUES ($1) RETURNING *",
      [location_name]
    );
    return res.rows[0];
  },

  // Find all locations
  findAll: async () => {
    const res = await pool.query("SELECT * FROM locations");
    return res.rows;
  },

  // Find location by ID
  findById: async (id) => {
    const res = await pool.query("SELECT * FROM locations WHERE id = $1", [id]);
    return res.rows[0];
  },

  // Update location by ID
  updateById: async (id, location_name) => {
    const res = await pool.query(
      "UPDATE locations SET location_name = $1 WHERE id = $2 RETURNING *",
      [location_name, id]
    );
    return res.rows[0];
  },

  // Delete location by ID
  deleteById: async (id) => {
    const res = await pool.query(
      "DELETE FROM locations WHERE id = $1 RETURNING *",
      [id]
    );
    return res.rows[0];
  },
};

module.exports = Location;
