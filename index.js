const express = require('express')
const app = new express()
const url = require('url')
const fs = require('fs')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const ejs = require('ejs')
const mongoose = require('mongoose')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { default: axios } = require('axios');
const fileUpload = require('express-fileupload')
app.use(fileUpload())

app.use(express.static(__dirname + '/views'))
app.use(express.static(__dirname + '/video'))
const homeController = require('./controllers/home')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const expressSession = require('express-session');
const logoutController = require('./controllers/logout')
const authcontroller = require('./controllers/auth.controller')
const otpauthentication =require('./controllers/otpauthentication')


const courseController = require('./controllers/course')
const uploadController = require('./controllers/upload')

const videoplayerController = require('./controllers/videoplayer')

mongoose.connect('mongodb://localhost:27017', {});

const db = mongoose.connection
db.once('open', () => {
    console.log("connected...")
})
app.set('trust proxy', 'loopback');
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.static('views'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(expressSession({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: false,
    store:MongoStore.create({mongoUrl:'mongodb://localhost:27017' })
}))
let port = process.env.PORT;
if (port == null||port==""){
    port = 4000;
}

axios.get('http://ip-api.com/json').then(res=>{
        
    global.ip=res.data.query;
    console.log(ip);
})
app.listen(port,'0.0.0.0', () => { console.log('App listening on port 4000') })

global.loggedIn = null;
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});
app.use(express.static(__dirname + '/'))

app.get('/videos',videoplayerController)

app.get('/', homeController)

app.get('/auth/logout', logoutController)

app.get('/auth/login' ,loginController)

app.get('/auth/register',newUserController )

app.post('/users/register' ,authcontroller.signUpUser)
app.post('/users/register/verify', otpauthentication)

app.post('/users/login',loginUserController)

app.get('/auth/course', courseController)

app.get('/auth/upload', uploadController)








// app.use((req, res) => res.render('notfound'))




