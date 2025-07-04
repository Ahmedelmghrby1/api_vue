import mysql from 'mysql2/promise'

export const dbConnection = async () => {
  try {
    const db = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'task_db'
    })
    console.log('Connected to database')
    return db
  } catch (err) {
    console.error('DB Connection Failed:', err)
    throw err
  }
}
