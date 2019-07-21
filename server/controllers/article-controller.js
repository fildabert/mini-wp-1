const Article = require("../models/article")

class ArticleController {

    static createArticle (req, res, next) {
        var tags = req.body.tags.filter((v, i, a) => a.indexOf(v) === i); 
        var newArticle = new Article({
            title: req.body.title,
            content: req.body.content,
            image: req.body.image,
            author: req.headers.decoded._id,
            tags: tags
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

    static findOneArticle(req, res, next) {
        Article.findOne({_id: req.query.id}).populate("author")
        .then(article =>{
            res.status(200).json(article)
        })
        .catch(next)
    }

    static updateArticle (req, res, next) {
        Article.findOne({_id: req.query.id})
        .then(article =>{
            article.title = req.body.title,
            article.content = req.body.content,
            article.image = req.body.image,
            article.author = req.headers.decoded._id,
            req.body.tags.forEach(tag =>{
                var includes = article.tags.includes(tag)
                if(!includes) {
                    article.tags.push(tag)
                }
            })
            // article.tags = req.body.tags
            return article.save()
        })
        .then(article =>{
            res.status(200).json(article)
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

    static getTrendingTags (req, res , next) {
        Article.find()
        .then(articles =>{
            var tags = []
            var arr = []
            var temp = {}
            articles.forEach(article =>{
                article.tags.forEach(tag =>{
                    if(temp[tag] === undefined) {
                        temp[tag] = 1
                    } else {
                        temp[tag]  ++
                    }
                })
            })
            var keys = Object.keys(temp)
            
            keys.forEach(key =>{
                arr.push([key, temp[key]])
            })

            arr.sort(function(a, b) {
              var tagA = a[1]
              var tagB = b[1]  
                if (tagA < tagB) {
                  return 1;
                }
                if (tagA > tagB) {
                  return -1;
                }
                return 0;
              });
              arr.splice(7, arr.length-7)
              arr.forEach(tag =>{
                  tags.push(tag[0])
              })
            res.status(200).json(tags)
        })
        .catch(next)
    }
}

module.exports = ArticleController