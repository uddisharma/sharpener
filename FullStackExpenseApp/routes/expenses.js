const express = require('express');
const router = express.Router();

// Retrieve all expenses
router.get('/', (req, res) => {
  const query = 'SELECT * FROM expenses';

  connection.query(query, (err, results) => {
    if (err) throw err;
    res.render('expenses/index', { expenses: results });
  });
});

// Create a new expense
router.post('/', (req, res) => {
  const { name, amount, date, category } = req.body;
  const query = 'INSERT INTO expenses (name, amount, date, category) VALUES (?, ?, ?, ?)';

  connection.query(query, [name, amount, date, category], (err) => {
    if (err) throw err;
    res.redirect('/expenses');
  });
});

module.exports = router;
