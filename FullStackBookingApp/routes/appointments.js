const express = require('express');
const router = express.Router();

// Retrieve all appointments
router.get('/', (req, res) => {
  const query = 'SELECT * FROM appointments';

  connection.query(query, (err, results) => {
    if (err) throw err;
    res.render('appointments/index', { appointments: results });
  });
});

// Create a new appointment
router.post('/', (req, res) => {
  const { name, date, time } = req.body;
  const query = 'INSERT INTO appointments (name, date, time) VALUES (?, ?, ?)';

  connection.query(query, [name, date, time], (err) => {
    if (err) throw err;
    res.redirect('/appointments');
  });
});

module.exports = router;
