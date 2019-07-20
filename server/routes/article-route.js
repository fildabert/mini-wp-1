const express = require("express")
const router = express.Router()
const articleController = require("../controllers/article-controller")
const authenticate = require("../middlewares/authenticate")
const authorize = require("../middlewares/authorize")


router.get("/all", articleController.findAll)
router.get("/tag", articleController.getByTag)
router.get("/tags", articleController.getAllTags)
router.get("/myarticles", authenticate, articleController.findMyArticles)
router.post("/addarticle", authenticate, articleController.createArticle)
router.put("/editarticle", authenticate, authorize, articleController.updateArticle)
router.delete("/deletearticle", authenticate, authorize, articleController.deleteArticle)

module.exports = router