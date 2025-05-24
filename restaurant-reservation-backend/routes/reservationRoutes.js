const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const verifyToken = require('../middleware/authMiddleware');

// Δημιουργία κράτησης
router.post('/', verifyToken, reservationController.createReservation);

// Εμφάνιση κρατήσεων του χρήστη
router.get('/', verifyToken, reservationController.getUserReservations);

// Διαγραφή κράτησης
router.delete('/:id', verifyToken, reservationController.deleteReservation);

// Ενημέρωση κράτησης
router.put('/:id', verifyToken, reservationController.updateReservation);

module.exports = router;
