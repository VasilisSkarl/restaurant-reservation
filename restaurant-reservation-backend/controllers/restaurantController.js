const db = require('../config/db');

exports.getAllRestaurants = (req, res) => {
  db.query('SELECT * FROM restaurants', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
};