const pool = require("../config");

const User = {
  create: async (username, password, role) => {
    const res = await pool.query(
      "INSERT INTO users (username, password, role) VALUES ($1, $2, $3) RETURNING *",
      [username, password, role]
    );
    return res.rows[0];
  },
  findByUsername: async (username) => {
    const res = await pool.query("SELECT * FROM users WHERE username = $1", [
      username,
    ]);
    return res.rows[0];
  },
};

module.exports = User;
