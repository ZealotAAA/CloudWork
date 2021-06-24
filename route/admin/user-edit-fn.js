// Introduce joi module-
const Joi = require('joi');
//Introducing the constructor of the user collection
const { User, validateUser } = require('../../model/user');
// Introduce encryption module
const bcrypt = require('bcryptjs');

module.exports = async (req, res, next) => {
    // res.send('ok');
    
    // Error module
    try {
        await validateUser(req.body);
    }catch (ex) {
        // return res.redirect(`/admin/user-edit?message=${ex.message}`);
        return next(JSON.stringify({path: '/admin/user-edit', message: ex.message}));
    }

    // Query whether the user exists according to the email address
    let user = await User.findOne({email: req.body.email});
    
    if (user) {
        return next(JSON.stringify({path:'/admin/user-edit', message: 'Email address is already taken'}));
    }

   // Encrypt the password
     // Generate random string
    const salt = await bcrypt.genSalt(10);
    // encryption
    const password = await bcrypt.hash(req.body.password, salt);
    // change password
    req.body.password = password;
    // add user data to database
    await User.create(req.body);
    // Redirect the page to the user list page
    return res.redirect('/admin/user');

    // res.send(req.body);
};