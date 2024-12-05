import mysql from 'mysql2';

// MySQL connection setup
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'admin',
  database: 'edunify',
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
