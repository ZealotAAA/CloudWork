// 引入mongoose第三方模块
const mongoose = require('mongoose');
const config = require('config');
// 取掉控制台的错误提示
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
// console.log('ENV:', process.env.NODE_ENV);

let url;
if(process.env.NODE_ENV === 'heroku') {
    url = `mongodb+srv://${config.get('db.user')}:${config.get('db.pwd')}@cluster0.rliv9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
}else{
    url = `mongodb://${config.get('db.user')}:${config.get('db.pwd')}@${config.get('db.host')}:${config.get('db.port')}/${config.get('db.name')}?authSource=admin`;
}

// console.log(url)
// var url = 'mongodb://fwx:fwx5618177@localhost/blog'
// console.log(url);

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    // console.log(err);
    if(err) return console.log(err);
})
.then(() => console.log(`${config.get('title')},Database connection is successful`))
.catch(() => console.log(`Database connection failed`))
