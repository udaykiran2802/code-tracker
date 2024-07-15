const jwt = require('jsonwebtoken');
const User = require('../models/auth-model');

const authMiddleware = async (req, res, next) => {
  console.log('Headers:', req.headers); // Log headers for debugging

  const authHeader = req.header('Authorization');
  
  if (!authHeader) {
    console.error('Authentication token is missing');
    return res.status(401).json({ message: 'Authentication token is missing' });
  }

  const token = authHeader.replace('Bearer ', '');
  console.log('Extracted Token:', token); // Log the extracted token

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log('Decoded Token:', decoded); // Log decoded token

    const user = await User.findOne({ _id: decoded.userId, 'tokens.token': token });
    if (!user) {
      console.error('User not found or token invalid');
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication failed:', error);
    res.status(401).json({ message: 'Please authenticate' });
  }
};

module.exports = authMiddleware;
