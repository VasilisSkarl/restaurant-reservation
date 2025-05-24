const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware');

router.post('/register', authController.register);
router.post('/login', authController.login);

// Προφίλ χρήστη (επιστρέφει user_id και email)
router.get('/profile', verifyToken, (req, res) => {
  const { user_id, email } = req.user;
  res.json({ user_id, email });
});

module.exports = router;
