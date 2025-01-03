const path=require('path')
const express =require('express')
const exphbs=require('express-handlebars')
const app=express()
const port=3000
const hostname='127.0.0.1'
const mongoose =require('mongoose')
const bodyParser=require('body-parser')
const fileUpload=require('express-fileupload')
const generateDate=require('./helpers/generateDate').generateDate
const expressSession=require('express-session')
const connectMongo=require('connect-mongo')

mongoose.connect('mongodb://127.0.0.1/blognode_db_test')
app.use(fileUpload())
app.use(express.static('public'))

const mongoStore=connectMongo(expressSession)

app.use(expressSession({
    secret:'testotesto',
    resave:false,
    saveUninitialized:true,
    store:new mongoStore({mongooseConnection:mongoose.connection})
}))

app.use((req,res,next)=>{
    res.locals.sessionFlash=req.session.sessionFlash
    delete req.session.sessionFlash
    next()
})

app.engine('handlebars', exphbs({helpers:{generateDate:generateDate}}))
app.set('view engine','handlebars')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const myMiddleware=(req,res,next)=>{
    console.log('Eray BN')
    next()  //işlemi yap yaptıktan sonra devam et anlamına gelir 
}
app.use('/',myMiddleware)

app.use((req,res,next)=>{
    const {userId}=req.session
    if(userId){
        res.locals={
            displayLink:true
        } }else{
            res.locals={
                displayLink:false
            }
    }
    next()
})

const main=require('./routes/main')
app.use('/', main)  //routesi require ettik middleware yi kullanmak için use ile aktif ettik
//bodyparser kurduktan sonra örnek olarak mainjs de post eklediğimiz yerde kod gümcelledik
const posts=require('./routes/posts')
const users=require('./routes/users')
const moment = require('moment')
app.use('/posts',posts)
app.use('/users',users)



app.listen(port,hostname, () => {
    console.log(`Server Çalışıyor, http://${hostname}:${port}/`)
})

//template engine örnek handlebars html dosyalarını daha kolay ayarlama için kullanırız npm i express-handlebars
//main içinde sitenin ortak alanları yani header ve footer bırakırız koduna da {{{body}}} yazarız
//kalan diğer kısımları ortak olmayan kısımlar yani sayfalara böleriz
//bodyparser post eklediğimiz anda sunucuya giden verileri yakalamamızı sağlar