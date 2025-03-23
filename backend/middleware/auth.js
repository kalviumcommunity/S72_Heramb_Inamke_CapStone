import User from '../models/User.js';

const auth = async (req, res, next) => {
  try {
    // Simple authentication check without JWT
    // You might want to implement a different authentication method here
    // For now, we'll just pass through the middleware
    
    // You can add a simple API key check if needed
    // const apiKey = req.header('x-api-key');
    // if (!apiKey || apiKey !== 'your-api-key') {
    //   return res.status(401).json({ message: 'Authentication failed' });
    // }
    
    // If you want to completely remove authentication:
    next();
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export default auth;