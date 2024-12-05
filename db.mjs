import mysql from 'mysql2';

// MySQL connection setup using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,        // Use DB_HOST for host
  user: process.env.DB_USER,        // Use DB_USER for user
  password: process.env.DB_PASSWORD, // Use DB_PASSWORD for password
  database: process.env.DB_NAME,    // Use DB_NAME for database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to MySQL');
  }
});

export default function handler(req, res) {
  if (req.method === 'GET') {
    const query = 'SELECT * FROM schools';

    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching schools:', err.message);
        return res.status(500).json({ error: 'Failed to fetch schools', details: err.message });
      }

      console.log('Fetched schools:', results);
      res.status(200).json({ schools: results });
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
