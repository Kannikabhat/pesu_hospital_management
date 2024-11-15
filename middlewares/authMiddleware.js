// middlewares/authMiddleware.js

// Middleware to optionally check for an admin access key for basic access control
exports.verifyToken = (req, res, next) => {
  console.log("Token verification bypassed for centralized admin panel"); // Log for debugging

  // Uncomment the following lines if you want to add basic access control
  // if (req.headers['x-admin-access'] !== process.env.ADMIN_KEY) {
  //   return res.status(403).send({ message: 'Forbidden access' });
  // }

  next(); // Proceed to the next middleware/route handler
};
