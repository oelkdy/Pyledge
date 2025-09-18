
//route
const express = require('express');
const router = express.Router();
module.exports = (db) => {
router.get('/addressbook', (req, res) => {
db.query('SELECT * FROM contacts', (err, results) => {
if (err) throw err;
res.render('addressbook', { contacts: results });
});
});
return router;
};

