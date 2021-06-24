// Import the comment collection constructor
const { CommentNoUser } = require('../../model/comment-nouser');

module.exports = async (req, res) => {
    // Receive request parameters passed by the client
    const { content, uid, aid } = req.body;

    const str = new RegExp("^[a-zA-Z0-9].+@*(.com)$")
    if (!str.test(uid)) return res.send('email error');
    // Store the comment information in the comment collection
    await CommentNoUser.create({
        content: content,
        uid: uid,
        aid: aid,
        time: new Date()
    });
    // res.send(aid);
    return res.redirect(`/home/article?id=${aid}`);
}