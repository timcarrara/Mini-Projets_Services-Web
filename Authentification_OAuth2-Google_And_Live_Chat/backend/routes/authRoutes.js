const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');
const verifyToken = require('../utils/authMiddleware');

const validateFrontendURL = (req, res, next) => {
  if (!process.env.FRONTEND_URL) {
    console.error('FRONTEND_URL non configuré dans .env');
    return res.status(500).send('Configuration serveur invalide');
  }
  next();
};

router.get('/test', (req, res) => {
  res.json({ status: 'OK' });
});

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  validateFrontendURL,
  passport.authenticate('google', {
    failureRedirect: `${process.env.FRONTEND_URL}/login?error=google`,
    successRedirect: process.env.FRONTEND_URL
  }),
  (err, req, res, next) => {
    if (err.message.includes("Email non fourni")) {
      return res.redirect(`${process.env.FRONTEND_URL}/login?error=no_email`);
    }
    next(err);
  }
);

router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get('/github/callback', 
  validateFrontendURL,
  passport.authenticate('github', {
    failureRedirect: `${process.env.FRONTEND_URL}/?auth_error=github`,
    successRedirect: process.env.FRONTEND_URL
  })
);

router.get('/current_user', async (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
  
  try {
    const user = await User.findById(req.user._id)
      .select('-accessTokens -refreshToken');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Erreur logout:', err);
      return res.status(500).json({ error: 'Logout failed' });
    }
    req.session.destroy((err) => {
      if (err) {
        console.error('Erreur destruction session:', err);
        return res.status(500).json({ error: 'Session destruction failed' });
      }
      res.clearCookie('connect.sid');
      res.redirect(process.env.FRONTEND_URL);
    });
  });
});

router.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'Accès autorisé', user: req.user });
});

module.exports = router;