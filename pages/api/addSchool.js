import mysql from 'mysql2';
import multer from 'multer';
import path from 'path';

// MySQL connection setup using mysql2
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads'); // Save images in the 'public/uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Create a unique filename for the uploaded file
  },
});

const upload = multer({ storage: storage });

// API handler function
export const config = {
  api: {
    bodyParser: false, // Disable default body parsing to handle file uploads
  },
};

const handler = (req, res) => {
  if (req.method === 'POST') {
    // Use multer to parse the form data, including files
    upload.single('image')(req, res, (err) => {
      if (err) {
        console.error('File upload error:', err);
        return res.status(500).json({ message: 'File upload failed', error: err.message });
      }

      console.log('Request body:', req.body);
      console.log('Uploaded file:', req.file);

      // Extract form data (text fields)
      const { name, email_id, address, city, state, contact } = req.body;
      const image = req.file ? req.file.path : null; // Get the uploaded file path

      // SQL query to insert the new school data into the database
      const query = 'INSERT INTO schools (name, email_id, address, city, state, contact, image) VALUES (?, ?, ?, ?, ?, ?, ?)';
      const values = [name, email_id, address, city, state, contact, image];

      // Execute the query
      db.query(query, values, (err, result) => {
        if (err) {
          console.error('Error inserting school:', err);
          return res.status(500).json({ message: 'Failed to add school', error: err.message });
        }

        // Send a success response
        res.status(200).json({ message: 'School added successfully' });
      });
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;
