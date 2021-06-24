// Import user collection constructor
const { User } = require('../../model/user');
// const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
    // res.render('admin/user', {
    //     msg: req.session.username
    // });
    // Identifies that the user currently visiting is the user management page
    req.app.locals.currentLink = 'user';
    // req.session.role = 'admin';
    // return res.send(req.session.role);

    // Receive the current page parameters passed by the client
    let page = req.query.page || 1;
    // res.send(page);
    // return;
    let pagesize = 10;
    let count = await User.countDocuments({});
    // res.send('用户总数是' + count);
    // return;
    // total pages
    let total = Math.ceil(count / pagesize);
    // Let the data query start position corresponding to the page number
    let start = (page - 1) * pagesize;


    // Query all user information from the database
    let users = await User.find({}).limit(pagesize).skip(start).sort({"root": 1, "username": 1, "email": 1, "state": 1, "role": 1});
    
    // res.send(users);
    return res.render('admin/user', {
        users: users,
        page: page,
        total: total,
        count: count
    })
};