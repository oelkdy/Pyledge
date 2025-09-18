const express = require('express');
const router = express.Router();

module.exports = (db) => {
  
  router.post('/register', (req, res) => {
    const { email, username, password, type } = req.body;

    if (password.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }
    const query = 'INSERT INTO users (email, username, password, type) VALUES (?, ?, ?, ?)';

    db.query(query, [email, username, password, type], (err, results) => {
      if (err)throw err;
      res.redirect('/login')
    });
  });

  return router;
};

