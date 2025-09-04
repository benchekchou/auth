const jwt = require('jsonwebtoken');

/**
 * Crée un token JWT à partir d'un payload utilisateur.
 */
const createToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};

/**
 * Vérifie et décode un token JWT.
 */
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { createToken, verifyToken };
