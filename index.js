const express = require('express')
const app = new express()
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
app.use(fileUpload())

const homeController = require('./controllers/home')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const expressSession = require('express-session');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware =
    require('./middleware/redirectIfAuthenticatedMiddleware')
const logoutController = require('./controllers/logout')
const validateMiddleware = require("./middleware/validateMiddleware")
const authcontroller = require('./controllers/auth.controller')
const otpauthentication =require('./controllers/otpauthentication')

const courseController = require('./controllers/course')
const uploadController = require('./controllers/upload')

mongoose.connect('mongodb://localhost:27017', {});

// const db = mongoose.connection
// db.once('open', () => {
//     console.log("connected...")
// })

const ejs = require('ejs')
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(expressSession({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}))
let port = process.env.PORT;
if (port == null||port==""){
    port = 4000;
}
app.listen(port, () => { console.log('App listening on port 4000') })

global.loggedIn = null;
app.use("*", (req, res, next) => {
    loggedIn = req.session.userId;
    next()
});

app.get('/', homeController)

app.get('/auth/logout', logoutController)

app.get('/auth/login', redirectIfAuthenticatedMiddleware ,loginController)

app.get('/auth/register', redirectIfAuthenticatedMiddleware,newUserController )

app.post('/users/register', redirectIfAuthenticatedMiddleware ,authcontroller.signUpUser)
app.post('/users/register/verify', otpauthentication)

app.post('/users/login', redirectIfAuthenticatedMiddleware,loginUserController)


app.get('/auth/course', courseController)

app.get('/auth/upload', uploadController)

app.use((req, res) => res.render('notfound'))




