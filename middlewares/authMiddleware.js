// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
  // Retrieve the token from the headers
  const token = req.headers['x-access-token'];

  // Check if the token is provided
  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }

    // Save the user ID for use in other routes
    req.userId = decoded.id;
    next(); // Proceed to the next middleware/route handler
  });
};
