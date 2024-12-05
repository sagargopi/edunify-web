import mysql from 'mysql2';

// MySQL connection setup
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err.message);
  } else {
    console.log('Connected to MySQL');
  }
});

export default function handler(req, res) {
  if (req.method === 'GET') {
    // SQL query to fetch all schools
    const query = 'SELECT * FROM schools';

    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching schools:', err.message);
        return res.status(500).json({ error: 'Failed to fetch schools', details: err.message });
      }

      console.log('Fetched schools:', results);
      
      // Add an image URL prefix for the school image path
      const schoolsWithImagePath = results.map((school) => ({
        ...school,
        image: school.image ? `/uploads/${school.image}` : '/default-image.jpg', // Fallback image if not available
      }));

      res.status(200).json({ schools: schoolsWithImagePath });
    });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
