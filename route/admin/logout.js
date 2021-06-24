module.exports = (req, res) => {
    // del session
    req.session.destroy(function () {
        // del  cookie
        res.clearCookie('connect.sid');

        // Clear user information in the template
        req.app.locals.userInfo = null;

        // Redirect to user login page
        // return res.send('logout');
        return res.redirect('/home');
    });
};
