// Import user collection constructor
const { User } = require('../../model/user');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
    // Accept request parameters
    const { email, password } = req.body;
    // res.send(req.body);
    if (email.trim().length == 0 || password.trim().length == 0) {
        // return res.status(400).send('<h4>Incorrect email address or password</h4>');
        return res.status(400).render('admin/error', {msg: 'Incorrect email address or password'});
        
    }

    // according to email address
    let user = await User.findOne({email});
    
    if(user) {
        // password check
        let isValid = await bcrypt.compare(password, user.password);
        if ( isValid ){
            // Login success
            // The username is stored in the request object
            req.session.username = user.username;
            // res.send(user.role);
            req.session.role = user.role;
            // req.session.root = user.root;
            // res.send(user.role);
            req.app.locals.userInfo = user;
            // res.send(req.app.locals.userInfo);

            if(user.role == 'admin' || (user.root == 0 && user.role == 'root')) {
                res.redirect('/admin/user');
            }else {
                res.redirect('/home/');
            }
            
            
        }else {
            return res.status(400).render('admin/error', {msg: 'Incorrect email address or password'});
        }

    }else {
    
    // User not find
    return res.status(400).render('admin/error', {msg: 'Incorrect email address or password'});
    }
}

module.exports = login;