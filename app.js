const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const logger = require('morgan')
const connectDB = require('./config/database')
require('dotenv').config({path: './config/.env'})

//import routes
const mainRoutes = require('./routes/main')

//define express app variable
const app = express();

//routes
app.use('/', mainRoutes)
app.use('/auth', require('./routes/auth'));

//connect to database
connectDB()

//define public folder
app.use(express.static('public'))

//set EJS as render engine
app.set('view engine', 'ejs')

//turn on logging using morgan
app.use(logger('dev'))

// Configure sessions stored in MongoDB
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
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
app.use(cookieParser());
app.use(express.json());

app.listen(process.env.PORT, ()=>{
  console.log(`Server is running on: http://localhost:${process.env.PORT}/`)
})  