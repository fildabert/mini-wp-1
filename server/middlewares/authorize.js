const Article = require("../models/article")

module.exports = (req, res, next) => {
    // console.log(req.query)
    Article.findOne({_id: req.query.id})
    .then(article =>{
        // console.log(article.author , req.headers.decoded._id)
        if(article.author == req.headers.decoded._id){
            next()
        } else {
            throw({
                code: 401,
                message: "Unauthorized"
            })
        }
    })
    .catch(err =>{
        throw({
            code: 500
        })
    })
}