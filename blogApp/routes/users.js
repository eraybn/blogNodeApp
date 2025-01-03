const express=require('express')
const router=express.Router()
const User=require('../models/User')

router.get('/register', (req,res) => {
    res.render('site/register')
})

router.post('/register', (req,res) => {
    User.create(req.body)
    .then(user=>{
        req.session.sessionFlash={
            type:'alert alert-danger',
            message:'Kullanıcı başarılı bir şekilde oluşturuldu'
        }
        res.redirect('/users/login')
    })
    .catch(error=>{
        console.log(error)
    })
})

router.get('/login', (req,res) => {
    res.render('site/login')
})

router.post('/login', (req, res)=>{
    const {email, password} = req.body

    User.findOne({email}).then((user) => {

        //console.log("User: " + user)
        //console.log(user.password)
        //console.log(password)

        if(user){
            console.log("True...user")
            if(user.password == password){
                req.session.userId=user._id
                console.log("True...pas")
                res.redirect('/')
            }else{
                console.log("False...pas")
                res.redirect('/users/login')
            }
        }else{
            console.log("False...user")
            res.redirect('/users/register')
        }
    })
})

router.get('/logout', (req,res) => {
    req.session.destroy(()=>{
        res.redirect('/')
    })
    res.render('site/login')
})


module.exports=router 