const { Article } = require('../../model/article');

module.exports = async (req, res) => {   
    // Identifies that the current visit is the article management page
    req.app.locals.currentLink = 'article';

    const { message, id } = req.query;

    if(req.app.locals.userInfo.state == 1) return res.render('admin/article', {
        message: 'Your account is frozen'
    });

    if(id) {
        let article = await Article.findOne({_id: id});
        // res.send(article);

        // Render the article editing page (modified)
        return res.render('admin/article-edit', {
            message: message,
            article: article,
            link: `/admin/article-modify?id=${id}`,
            button: 'Change'
        })
    }else {
        return res.render('admin/article-edit', {
            message: message,
            link: '/admin/article-add',
            button: 'Add'
        })
    }
    
}