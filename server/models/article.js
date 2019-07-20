const mongoose = require("mongoose")

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Article title cannot be empty"]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        required: [true, "Article content cannot be empty"]
    },
    image: {
        type: String,
        required: [true, "Article image cannot be empty"]
    },
    tags: [{type: String}]
}, {timestamps: true})


module.exports = mongoose.model("Article", articleSchema)