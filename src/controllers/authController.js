// Contrôleur d'authentification de haute qualité
const authService = require('../services/authServices');

// Validation des entrées
const { body, validationResult } = require('express-validator');

// Middleware de validation pour l'inscription : vérifie email, mot de passe, nom, prénom et âge
exports.validateRegister = [
  body('email').isEmail().withMessage('Email invalide'),
  body('password').isLength({ min: 6 }).withMessage('Mot de passe trop court'),
  body('name').notEmpty().withMessage('Nom requis'),
  body('surname').notEmpty().withMessage('Prénom requis'),
  body('age').isInt({ min: 1 }).withMessage('Âge requis et doit être un nombre positif'),
];

// Middleware de validation pour la connexion : vérifie email et mot de passe
exports.validateLogin = [
  body('email').isEmail().withMessage('Email invalide'),
  body('password').isLength({ min: 6 }).withMessage('Mot de passe trop court'),
];

// Fonction de connexion : vérifie les données, appelle le service d'authentification et retourne le token JWT
exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};

// Fonction d'inscription : vérifie les données, appelle le service pour créer l'utilisateur et retourne l'utilisateur créé
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { email, password, name, surname, age } = req.body;
    const result = await authService.register(email, password, name, surname, age);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};
