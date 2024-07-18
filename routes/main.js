const express = require('express')
const router = express.Router()
//const authController = require('../controllers/auth') 
//const homeController = require('../controllers/home')
const { requireAuth } = require('../middleware/auth')

router.get('/', (req,res)=>{
    res.render('index.ejs')
})
// router.get('/login', authController.getLogin)
// router.post('/login', authController.postLogin)
// router.get('/logout', authController.logout)

router.get('/auth/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
});

router.get('/login', (req,res)=>{
    res.render('login.ejs')
})
router.get('/register', (req,res)=>{
    res.render('register.ejs')
})
router.get('/home', requireAuth, (req,res)=>{
    res.render('home.ejs', {user: req.user})
})
// router.post('/signup', authController.postSignup)

module.exports = router