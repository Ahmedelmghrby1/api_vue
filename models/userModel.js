import { dbConnection } from "../database/dbConnection.js";

const db = await dbConnection()

const findUserByUsername = async (username) => {
  const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
};

const createUser = async (username, hashedPassword) => {
  await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword]);
};


const userModel = {
  findUserByUsername,
  createUser,
};
export default userModel;