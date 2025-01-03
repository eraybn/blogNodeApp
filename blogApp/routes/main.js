const express=require('express')
const router=express.Router() //router ı tanımladığımız için app.get yerine router.get kullanırız
const Post=require('../models/Post')
router.get('/', (req,res) => {
    console.log(req.session)
    res.render('site/index')
})
router.get('/about', (req,res) => {
    res.render('site/about')
})
router.get('/blog', (req,res) => {
    Post.find({}).lean().then(posts=>{
        res.render('site/blog',{posts:posts})
    })
})
router.get('/contact', (req,res) => {
    res.render('site/contact') 
})
// router.get('/login', (req,res) => {
//     res.render('site/login')
// })
// router.get('/register', (req,res) => {
//     res.render('site/register')
// })
/* router.get('/posts/new', (req,res) => {
    res.render('site/addpost')
})
router.post('/posts/test', (req,res) => {
    console.log(req.body)    //router post dedik çünkü post gönderiyoruz ekleme yapacağız res.redirect('/') desek anasayfa gider
    res.redirect('/')
}) */

module.exports=router 