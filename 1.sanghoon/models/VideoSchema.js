const mongoose = require('mongoose')
const Schema = mongoose.Schema

const VideoSchema = new Schema({
    title: String,
    body: String
})

const BlogPost = mongoose.model('BlogPost', BlogPostSchema)
module.exports = BlogPost