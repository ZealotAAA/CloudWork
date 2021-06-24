const { Article } = require('../../model/article');
// Import third-party modules formidable
const formidable = require('formidable');
const { date } = require('joi');


module.exports = async (req, res, next) => {
    const id = req.query.id;
    // res.send(id);
    // 1.Create form parsing object
    const form = new formidable.IncomingForm();
     // 2.Parse the form
    form.parse(req, async (err, fields, files) => {
    // res.send(files);
        const { title, author, content, sorts } = fields;
        let publishDate = fields.publishDate;
        const cover = files.cover;

        if( !title || !sorts ) {
            
            // return res.redirect('/admin/article')
            let obj = {path: '/admin/article-edit', message: 'The content is not filled in, and the user information cannot be modified', id: id};
            return next(JSON.stringify(obj))
            
        }
        // console.log(id)
        if( !publishDate )  publishDate = new Date();
        // return res.send(publishDate);

        let article = await Article.findOne({_id: id});

        // res.send(article);
        await Article.updateOne({_id: id}, {
            title: title,
            author: author,
            publishDate: publishDate,
            content: content,
            sorts: sorts
        });

        // res.send(articles);
        // let articles = await Article.findOne({_id: id});
        // res.send(articles);
        return res.redirect('/admin/article');
    })

}