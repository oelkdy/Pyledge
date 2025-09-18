
module.exports = function(db) {
    const express = require('express');
    const router = express.Router();

    router.get('/logout', (req, res) => {
        req.session.destroy(err => {
            if (err) {
                console.log('Error during logout:', err);
                res.send('Error occurred during logout');
            } else {
                res.redirect('/loginViews');
            }
        });
    });

    return router;
};
