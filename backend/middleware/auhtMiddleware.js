// backend/middleware/authMiddleware.js
require('dotenv').config();
const jwt = require('jsonwebtoken');

/**
 * Middleware: Verify that the request has a valid JWT.
 * If valid, attaches decoded payload to req.user.
 * Otherwise, sends 401 Unauthorized.
 */
function verifyToken(req, res, next) {
  // Expect JWT in Authorization header as "Bearer <token>"
  const authHeader = req.headers['authorization'] || req.headers['Authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  const token = authHeader.split(' ')[1]; // the actual JWT string
  if (!token) {
    return res.status(401).json({ message: 'Malformed token.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user info (e.g. id, role) to request object
    req.user = {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email,
      // …any other fields you encoded
    };
    next();
  } catch (err) {
    console.error('JWT verification error:', err);
    return res.status(401).json({ message: 'Unauthorized: invalid token.' });
  }
}

/**
 * Middleware: Only allow access if req.user.role === 'admin'.
 * Requires that verifyToken was already run.
 */
function isAdmin(req, res, next) {
  if (!req.user) {
    // If somehow verifyToken didn't run, block access
    return res.status(401).json({ message: 'Unauthorized: no user info.' });
  }
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admins only.' });
  }
  next(); // user is an admin → proceed
}

module.exports = {
  verifyToken,
  isAdmin,
};
