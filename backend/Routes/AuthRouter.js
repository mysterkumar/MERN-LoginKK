const { signup, login } = require('../Controllers/AuthController');
const { signupValidation, loginValidation } = require('../Middlewares/AuthValidation');

const router = require('express').Router();

router.post('/login', (req, res, next) => {
    console.log('Login request received:', req.body); // Debug log
    next();
}, loginValidation, login);

router.post('/signup', (req, res, next) => {
    console.log('Signup request received:', req.body); // Debug log
    next();
}, signupValidation, signup);

module.exports = router;
