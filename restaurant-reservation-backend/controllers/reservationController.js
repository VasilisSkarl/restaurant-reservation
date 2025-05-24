const db = require('../config/db');

exports.createReservation = (req, res) => {
  const { restaurant_id, date, time, people_count } = req.body;
  const user_id = req.user.user_id; // Το user_id από το JWT

  if (!restaurant_id || !date || !time || !people_count) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const query = `
    INSERT INTO reservations (user_id, restaurant_id, date, time, people_count)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [user_id, restaurant_id, date, time, people_count], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: 'Reservation created successfully' });
  });
};

exports.getUserReservations = (req, res) => {
  const user_id = req.user.user_id; // Το user_id από το JWT

  const query = `
    SELECT r.*, t.name AS restaurant_name, t.location
    FROM reservations r
    JOIN restaurants t ON r.restaurant_id = t.restaurant_id
    WHERE r.user_id = ?
    ORDER BY r.date DESC, r.time DESC
  `;

  db.query(query, [user_id], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};

exports.updateReservation = (req, res) => {
  const reservation_id = req.params.id;
  const user_id = req.user.user_id; // Το user_id από το JWT
  const { date, time, people_count } = req.body;

  if (!date || !time || !people_count) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const query = `
    UPDATE reservations
    SET date = ?, time = ?, people_count = ?
    WHERE reservation_id = ? AND user_id = ?
  `;

  db.query(query, [date, time, people_count, reservation_id, user_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Reservation not found or not yours' });
    }

    res.json({ message: 'Reservation updated successfully' });
  });
};

exports.deleteReservation = (req, res) => {
  const reservation_id = req.params.id;
  const user_id = req.user.user_id; // Το user_id από το JWT

  const query = `DELETE FROM reservations WHERE reservation_id = ? AND user_id = ?`;

  db.query(query, [reservation_id, user_id], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Reservation not found or not yours' });
    }

    res.json({ message: 'Reservation deleted successfully' });
  });
};
