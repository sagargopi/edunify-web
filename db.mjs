import mysql from 'mysql2/promise';

// Create a MySQL connection pool for better performance
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'admin',
  database: process.env.DB_NAME || 'edunify',
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, address } = req.body;

    // Validate input fields
    if (!name || !email || !address) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    try {
      // Insert data into the schools table
      const query = 'INSERT INTO schools (name, email, address) VALUES (?, ?, ?)';
      const [results] = await pool.query(query, [name, email, address]);

      return res.status(200).json({
        message: 'School added successfully',
        schoolId: results.insertId, // Return the ID of the inserted row
      });
    } catch (error) {
      console.error('Error inserting school:', error);
      return res.status(500).json({ message: 'Failed to add school' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
