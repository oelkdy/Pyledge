
module.exports = function(db) {
    const express = require('express');
    const router = express.Router();

    // Profile page
    router.get('/profile', (req, res) => {
        if (!req.session.user) {
            return res.redirect('/login');
        }

        const user = {
            email: req.session.email,
            name: req.session.username,
            type: req.session.type
        };

        res.render('profileViews', { user });
    });

    // Edit profile page
    router.get('/profile/edit', (req, res) => {
        if (!req.session.user) {
            return res.redirect('/login');
        }

        const user = {
            email: req.session.email,
            name: req.session.username,
            type: req.session.type
        };

        res.render('editViews', { user });
    });

    // Handle profile update
    router.post('/profile/edit', (req, res) => {
        if (!req.session.user) {
            return res.redirect('/login');
        }

        const { email, name, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.send('Passwords do not match.');
        }

        const updateQuery = 'UPDATE users SET email = ?, username = ?, password = ? WHERE id = ?';
        db.query(updateQuery, [email, name, password, req.session.user.id], (err, result) => {
            if (err) {
                return res.send('An error occurred.');
            }

            req.session.email = email;
            req.session.username = name;
            res.redirect('/profile');
        });
    });

    // Handle profile deletion
    router.post('/profile/delete', (req, res) => {
        if (!req.session.user) {
            return res.redirect('/login');
        }

        const deleteQuery = 'DELETE FROM users WHERE id = ?';
        db.query(deleteQuery, [req.session.user.id], (err, result) => {
            if (err) {
                return res.send('An error occurred.');
            }

            req.session.destroy((err) => {
                if (err) {
                    return res.send('An error occurred while logging out.');
                }
                res.redirect('/login');
            });
        });
    });

    return router;
};
