import mysql from 'mysql2/promise';  // Use promise-based mysql2 for async/await support
import dotenv from 'dotenv';

dotenv.config();

// Create a connection pool (Recommended for production)
const pool = mysql.createPool({
  host: process.env.DB_HOST,         // Use DB_HOST for host
  user: process.env.DB_USER,         // Use DB_USER for user
  password: process.env.DB_PASSWORD, // Use DB_PASSWORD for password
  database: process.env.DB_NAME,     // Use DB_NAME for database name
  waitForConnections: true,          // Wait for a connection if the pool is busy
  connectionLimit: 10,               // Limit the number of connections in the pool
  queueLimit: 0                      // No limit for queued connections
});

// Connect to MySQL (Pool connection example)
async function connectToDatabase() {
  try {
    const connection = await pool.getConnection();
    console.log('Connected to MySQL');
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error('Database connection error:', err.message);
  }
}

// Initialize the DB connection when the server starts (you can call this during startup)
connectToDatabase();

// API handler for GET requests
export default async function handler(req, res) {
  if (req.method === 'GET') {
    const query = 'SELECT * FROM schools';

    try {
      const [results] = await pool.query(query);  // Use async/await with pool query
      console.log('Fetched schools:', results);
      res.status(200).json({ schools: results });
    } catch (err) {
      console.error('Error fetching schools:', err.message);
      res.status(500).json({ error: 'Failed to fetch schools', details: err.message });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
