const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    "postgres://fsnzegyb:oUcgSddcgozPz0Udej6E4qTN1jcFKlxU@berry.db.elephantsql.com/fsnzegyb",
});

const getAllAccountsByUser = async (email) => {
  try {
    const result = await pool.query(
      "SELECT * FROM accounts WHERE userEmail = $1",
      [email]
    );
    return result.rows;
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const updateAccount = async (id, balance) => {
  try {
    const result = await pool.query(
      "UPDATE accounts SET balance = $1 WHERE id = $2 RETURNING *",
      [balance, id]
    );
    return result.rows[0];
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const createAccount = async (email, name) => {
  try {
    const result = await pool.query(
      "INSERT INTO accounts (userEmail, balance, accountName) VALUES ($1, 0, $2) RETURNING *",
      [email, name]
    );
    return result.rows;
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

const deleteAccount = async (id) => {
  try {
    await pool.query("DELETE FROM accounts WHERE id = $1", [id]);
    return true;
  } catch (err) {
    return false;
  }
};

module.exports = {
  deleteAccount,
  createAccount,
  updateAccount,
  getAllAccountsByUser,
};
