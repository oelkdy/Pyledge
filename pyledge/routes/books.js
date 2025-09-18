module.exports = function(db) {
    const express = require('express');
    const router = express.Router();
  
    router.get('/books', (req, res) => {
        if (!req.session.user) {
            res.redirect('/login');
        } else {
            const books = [
                { title: 'Intro to Python Web', url: '/pdfs/Intro_Python_web.pdf' },
                { title: 'Learning Python', url: '/pdfs/Learning_Python.pdf' },
                { title: 'Python Basics', url: '/pdfs/python_basics.pdf' },
                { title: 'Python', url: '/pdfs/python.pdf' },
            ];

            res.render('booksViews', { books, username: req.session.user.username });
        }
    });
  
    return router;
};
