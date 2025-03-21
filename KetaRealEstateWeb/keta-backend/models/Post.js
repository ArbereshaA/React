const pool = require("../config"); // Assuming you are using a pool from pg

const Post = {
  create: async (title, author, seo_title, metadescription, photo_url) => {
    const res = await pool.query(
      "INSERT INTO posts (title, author, seo_title, metadescription, photo_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [title, author, seo_title, metadescription, photo_url]
    );
    return res.rows[0];
  },
  findAll: async () => {
    const res = await pool.query("SELECT * FROM posts ORDER BY date DESC");
    return res.rows;
  },
  findById: async (id) => {
    const res = await pool.query("SELECT * FROM posts WHERE id = $1", [id]);
    return res.rows[0];
  },
  updateById: async (
    id,
    title,
    author,
    seo_title,
    metadescription,
    photo_url
  ) => {
    const res = await pool.query(
      "UPDATE posts SET title = $1, author = $2, seo_title = $3, metadescription = $4, photo_url = $5 WHERE id = $6 RETURNING *",
      [title, author, seo_title, metadescription, photo_url, id]
    );
    return res.rows[0];
  },
  deleteById: async (id) => {
    const res = await pool.query(
      "DELETE FROM posts WHERE id = $1 RETURNING *",
      [id]
    );
    return res.rows[0];
  },
};

module.exports = Post;
