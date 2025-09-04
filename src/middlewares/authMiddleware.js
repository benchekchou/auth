// Importe la fonction de vérification du token JWT
const { verifyToken } = require('../util/token');

/**
 * Middleware d'authentification pour protéger les routes privées.
 * Vérifie le token JWT et le rôle de l'utilisateur.
 * @param {Array} roles - Liste des rôles autorisés pour la route
 */
const authMiddleware = (roles = []) => {
  // Fonction middleware exécutée à chaque requête protégée
  return (req, res, next) => {
  // Récupère le token JWT depuis l'en-tête Authorization
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token provided' });

    try {
      // Vérifie et décode le token JWT
      const decoded = verifyToken(token);
      req.user = decoded;

      // Vérifie le rôle de l'utilisateur si nécessaire
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ error: 'Forbidden: insufficient role' });
      }

      // Passe au middleware suivant si tout est OK
      next();
    } catch {
      // Token invalide ou expiré
      return res.status(403).json({ error: 'Invalid token' });
    }
  };
};

// Exporte le middleware pour utilisation dans les routes
module.exports = authMiddleware;
