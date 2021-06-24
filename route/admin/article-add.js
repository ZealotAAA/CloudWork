// Introduce third-party modules formidable
const formidable = require('formidable');
const path = require('path');
const { Article } = require('../../model/article');
const fs = require('fs');

module.exports =  (req, res, next) => {
    //  res.send('ok');
    // 1.Create form parsing object
    const form = new formidable.IncomingForm();
    // 2.Configure the storage location of uploaded files
    form.uploadDir = path.join(__dirname, '../', '../', 'public', 'uploads')
    // console.log(form.uploadDir);
    // 3.Keep the suffix of the uploaded file
    form.keepExtensions = true;
    // 4.Parse the form
    form.parse(req, async (err, fields, files) => {
        // res.send(files);
        // return res.send(files.cover.path.split('public')[1]);
        let coverFile = files.cover.path.split('public')[1];
        let filedDir = path.join(__dirname, '../../public');
        let location = `${filedDir}${coverFile}`;
        let fix = files.cover.path.split('.')[1];
        if(!fields.title || !fields.author || !fields.sorts) {
            // return res.send(location);
                fs.unlink(`${location}`,(err) => {
                  if (err) {
                    console.log(err);
                  } else {
                    console.log('delete ok');
                  }
                });


            return next(JSON.stringify({path: '/admin/article-edit', message: 'Title and category are not filled in'}))
        }
        // fwxtest-
        if(!fields.publishDate)  fields.publishDate = new Date();
        if(!coverFile || !fix){
          coverFile = '\\uploads\\default\\default.jpg';
          fs.unlink(`${location}`,(err) => {
            if (err) {
              console.log(err);
            } else {
              console.log('delete ok');
            }
          });
        }
        // return res.send(coverFile);
        const formData = await Article.create({
            title: fields.title,
            author: fields.author,
            publishDate: fields.publishDate,
            cover: coverFile,
            content: fields.content,
            sorts: fields.sorts,
            contentImage: JSON.stringify(global.imgarr)
        })

        global.imgarr = [];
        console.log('Increased global:', global.imgarr);

        // console.log(formData);
        return res.redirect('/admin/article');
    })
}