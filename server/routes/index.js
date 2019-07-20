const express = require("express")
const router = express.Router()
const userRoute = require("./user-route")
const articleRoute = require("./article-route")
const images = require("../helpers/images")

router.use("/users", userRoute)
router.use("/articles", articleRoute)
router.post('/googleCloudStorage', 
    images.multer.single('image'), 
    images.sendUploadToGCS,
    (req,res,next)=>{
        let imageLink = req.file.cloudStoragePublicUrl
        res.status(200).json(imageLink)
    }
)
module.exports = router