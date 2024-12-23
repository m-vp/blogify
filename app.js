require('dotenv').config()
const express = require('express');
const userRoute = require('./routes/user')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const { checkForAuthCookie } = require('./middlewares/auth');
const blogRoute = require('./routes/blog')
const path = require('path')


const app = express();
const PORT = process.env.PORT || 8000

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log('mongodb connected'))
.catch(err => console.log(err))
//mongodb://localhost:27017/14-blog
app.set('view engine', 'ejs')
// app.set('views','./views')
app.set('views', path.resolve(__dirname, 'views'));

app.use(express.static(path.resolve('./public')))
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())
app.use(checkForAuthCookie('token'))
const Blog = require('./models/blog')

app.get('/', async (req,res) => {
    console.log(req.user)
    const allBlogs = await Blog.find()
    
    res.render('home', {
        blogs:allBlogs,
        user: req.user
    })
})

app.use('/user', userRoute)
app.use('/blog', blogRoute)

app.listen(PORT, () => console.log(`http://localhost:${PORT}`))