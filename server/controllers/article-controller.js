const Article = require("../models/article")

class ArticleController {

    static createArticle (req, res, next) {
        var newArticle = new Article({
            title: req.body.title,
            content: req.body.content,
            image: req.body.image,
            author: req.headers.decoded._id,
            tags: req.body.tags
        })
        newArticle.save()
        .then(article =>{
            res.status(201).json(article)
        })
        .catch(next)
    }

    static findAll (req, res, next) {
        Article.find().populate("author").sort([['createdAt', 'descending']])
        .then(articles =>{
            res.status(200).json(articles)
        }) 
        .catch(next)
    }

    static findMyArticles (req, res, next) {
        Article.find({author: req.headers.decoded._id}).populate("author").sort([['createdAt', 'descending']])
        .then(articles =>{
            res.status(200).json(articles)
        })
        .catch(next)
    }

    static getByTag (req, res, next) {
        Article.find({tags: {$in: [req.query.tag]}}).populate("author").sort([['createdAt', 'descending']])
        .then(articles =>{
            res.status(200).json(articles)
        })
        .catch(next)
    }

    static getAllTags (req, res , next) {
        Article.find()
        .then(articles =>{
            var tags = []
            articles.forEach(article =>{
                article.tags.forEach(tag =>{
                    var includes = tags.includes(tag)
                    if(!includes) {
                        tags.push(tag)
                    }
                })
            })
            tags.sort(function(a, b) {
                var tagA = a.toUpperCase()
                var tagB = b.toUpperCase()
                if (tagA < tagB) {
                  return -1;
                }
                if (tagA > tagB) {
                  return 1;
                }
                return 0;
              });
            res.status(200).json(tags)
        })
        .catch(next)
    }

    static updateArticle (req, res, next) {
        Article.findOne({_id: req.body._id})
        .then(article =>{
            article.title = req.body.title,
            article.content = req.body.content,
            article.image = req.body.content,
            article.author = req.headers.decoded._id,
            article.tags.push(req.body.tags)
            return article.save()
        })
        .catch(next)
    }

    static deleteArticle (req ,res ,next) {
        Article.findOne({_id: req.query.id})
        .then(article =>{
            return article.remove()
        })
        .then(article =>{
            res.status(200).json(article)
        })
        .catch(next)
    }
}

module.exports = ArticleController