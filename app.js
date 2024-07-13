const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const logger = require('morgan')
const connectDB = require('./config/database')

//Define express app variable
const app = express();

//Enable environment variables
require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

//Import routes
const mainRoutes = require('./routes/main')

//Connect to database
connectDB()

//Set EJS as template engine
app.set('view engine', 'ejs')

//Define public folder
app.use(express.static('public'))

//Parse POST/PUT requests
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Cookies
//app.use(cookieParser());

//Turn on logging using morgan
app.use(logger('dev'))

// Configure sessions stored in MongoDB
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_STRING,
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day 
    }
  })
);

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/', mainRoutes)
app.use('/auth', require('./routes/auth'));

app.listen(process.env.PORT, ()=>{
  console.log(`Server is running on: http://localhost:${process.env.PORT}/`)
})  