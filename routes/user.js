const express = require('express')
const router = express.Router();
const User = require('../models/user')

router.get('/signin', (req,res) => {
    return res.render('signin')
})

router.get('/signup', (req,res) => {
    return res.render('signup')
})


router.post('/signup', async (req,res) => {

    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password
    })
    return res.redirect('/user/signin')
})


router.post('/signin', async (req,res) => {
    try {
        const {email, password} = req.body;
        const token = await User.matchPasswordAndGenerateToken(email,password);
        return res.cookie('token', token).redirect('/')
    } catch (error) {
        return res.render('signin',{
            err: 'Incorrect Email or Password'
        })
    }
})

router.get('/logout', (req,res)=>{
    res.clearCookie('token').redirect('/')
})


module.exports = router;