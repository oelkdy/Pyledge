const express = require('express');
const router = express.Router();
module.exports = (db) => {
router.post('/add', (req, res) => {
const { name, email, phone } = req.body;
const query = 'INSERT INTO contacts (name, email, phone) VALUES (?, ?, ?)';
db.query(query, [name, email, phone], (err, results) => {
if (err) throw err;
res.redirect('/addressbook');
});
});
return router;
};