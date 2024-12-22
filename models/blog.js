const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    content: {
        type: String,
        required: true
    },

    coverImageUrl : {
        type: String,
        required: false
    },

    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
}, {timestamps: true})

const Blog = mongoose.model('blog', blogSchema);


module.exports = Blog;