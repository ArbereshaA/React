const pool = require("../config"); // Assuming you are using a pool from pg

const Property = {
  create: async (
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
  ) => {
    const res = await pool.query(
      `INSERT INTO properties 
       (category_id, location_id, photos, type, price, minarea, maxarea, bathroom, bedroom, 
       properties_title, properties_description, floor_description, floor_photos, nearby,currency) 
       VALUES 
       ($1, $2, $3::text[], $4, $5, $6, $7, $8, $9, $10, $11, $12::text[], $13::text[], $14,$15) 
       RETURNING *`,
      [
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
        currency,
      ]
    );
    return res.rows[0];
  },

  findAll: async () => {
    const res = await pool.query("SELECT * FROM properties");
    return res.rows;
  },

  findById: async (id) => {
    const res = await pool.query("SELECT * FROM properties WHERE id = $1", [
      id,
    ]);
    return res.rows[0];
  },

  updateById: async (
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
  ) => {
    const res = await pool.query(
      `UPDATE properties 
       SET category_id = $1, location_id = $2, photos = $3::text[], floor_photos = $4::text[], 
           type = $5, price = $6, nearby = $7, minarea = $8, maxarea = $9, 
           bathroom = $10, bedroom = $11, properties_title = $12, 
           properties_description = $13, floor_description = $14, currency = $15
       WHERE id = $16
       RETURNING *`,
      [
        category_id,
        location_id,
        photos, // Array of photos
        floor_photos, // Array of floor photos
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
        id,
      ]
    );
    return res.rows[0];
  },

  deleteById: async (id) => {
    const res = await pool.query(
      "DELETE FROM properties WHERE id = $1 RETURNING *",
      [id]
    );
    return res.rows[0];
  },
};

module.exports = Property;
