const express = require('express');
const router = express.Router();

module.exports = (db) => {
  
  router.get('/dashboard', (req, res) => {
    if (!req.session.user) {
      res.redirect('/login');
    } else {
      res.render('dashboard', { username: req.session.username });
    }
  });

  router.get('/logout', (req, res) => {
    req.session.destroy(err => {
      if (err) {
        console.error(err);
        res.send('Error occurred during logout');
      } else {
        res.redirect('/login');
      }
    });
  });

  return router;
};
