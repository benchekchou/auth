const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();


// Route d'inscription : crée un nouvel utilisateur
router.post('/register', authController.validateRegister, authController.register);

// Route de connexion : authentifie l'utilisateur et retourne un token
router.post('/login', authController.validateLogin, authController.login);



module.exports = router;
