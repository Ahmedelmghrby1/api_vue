import { dbConnection } from "../../database/dbConnection.js";

// GET all tasks
const getTasks = async (req, res) => {
  try {
    const db = await dbConnection();
    const [rows] = await db.query('SELECT * FROM tasks');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching tasks', error: err.message });
  }
};

// POST new task
const createTask = async (req, res) => {
  const { title } = req.body;
  try {
    const db = await dbConnection();
    await db.query('INSERT INTO tasks (title) VALUES (?)', [title]);
    res.status(201).json({ message: 'Task added' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating task', error: err.message });
  }
};

// PUT update task
const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const db = await dbConnection();
    await db.query('UPDATE tasks SET title = ? WHERE id = ?', [title, id]);
    res.json({ message: 'Task updated' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating task', error: err.message });
  }
};

// DELETE task
const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const db = await dbConnection();
    await db.query('DELETE FROM tasks WHERE id = ?', [id]);
    res.json({ message: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting task', error: err.message });
  }
};

export {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};
