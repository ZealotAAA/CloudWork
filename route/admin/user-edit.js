const { User } = require('../../model/user');
module.exports = async (req, res) => {

  // Identifies that the user currently visiting is the user management page
    req.app.locals.currentLink = 'user';

    const { message, id } = req.query;
    // return res.send(req.app.locals.userInfo);
    if(req.app.locals.userInfo.state == 1) return res.render('admin/user', {
        message: 'Your account has been frozen'
    });
    
    // If the id parameter is currently passed
    if(id) {
        let user = await User.findOne({_id: id});
        
        // Render the user edit page (modify)
        return res.render('admin/user-edit', {
            message: message,
            user: user,
            link: '/admin/user-modify?id=' + id,
            button: 'Change'
        });
    }else {
        
        return res.render('admin/user-edit', {
            message: message,
            link: '/admin/user-edit',
            button: 'Add'
        });
    }
};