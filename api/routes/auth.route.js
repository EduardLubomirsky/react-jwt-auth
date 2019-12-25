const express = require('express');
const passport = require('passport');
const router = express.Router();
const controller = require('../controllers/auth.controller');

router.post('/login', controller.login);
router.post('/register', controller.register);

// passport.authenticate('jwt', {session: false}),

module.exports = router;