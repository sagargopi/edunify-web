import Cors from 'cors';

// Initialize the CORS middleware
const cors = Cors({
  methods: ['GET', 'POST', 'OPTIONS'],  // Allowed methods
  origin: '*',  // You can specify an array of allowed origins like ['http://localhost:3000']
});

// Helper function to run CORS middleware
export function runCors(req, res, next) {
  cors(req, res, (result) => {
    if (result instanceof Error) {
      return res.status(500).json({ message: 'CORS error' });
    }
    next();
  });
}
