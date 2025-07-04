import { dbConnection } from "../../database/dbConnection.js";
import bcrypt from "bcrypt";
import userModel from "../../models/userModel.js"
import jwt from 'jsonwebtoken';

const db = await dbConnection()



const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    const existing = await userModel.findUserByUsername(username);
    if (existing) return res.status(400).json({ message: 'Username already exists' });

    const hashed = await bcrypt.hash(password, 10);
    await userModel.createUser(username, hashed);
    res.status(201).json({ message: 'User created' });
  } catch {
    res.status(500).json({ message: 'Registration failed' });
  }
};
const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await userModel.findUserByUsername(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const payload = { id: user.id, username: user.username };

    jwt.sign(payload, "myNameIsAhmed", { expiresIn: '1d' }, (err, token) => {
      if (err) {
        return res.status(500).json({ message: 'Token generation failed' });
      }

      res.json({ message: "success", token });
    });

  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Login failed" });
  }
};



export{
  register,
  login
}
