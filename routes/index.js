const express = require('express')
const { isLoggedIn, isNotLoggedIn } = require('./middlewares')
const { Post, User } = require('../models')

const router = express.Router()
/* GET login page. */
router.get('/', isNotLoggedIn, (req, res, next) => {
  res.render('login', {
    title: 'Dong',
    user: req.user,
    loginError: req.flash('loginError')
  })
})

/* GET join page. */
router.get('/join', isNotLoggedIn, (req, res, next) => {
  res.render('join', {
    title: 'Dong',
    user: req.user,
    joinError: req.flash('joinError')
  })
})

/* GET home page. */
router.get('/home', isLoggedIn, (req, res, next) => {
  Post.findAll({
    include: {
      model: User,
      attributes: ['id', 'nick']
    },
    order: [['createdAt', 'DESC']]
  })
    .then((posts) => {
      res.render('home', {
        title: 'Dong',
        user: req.user,
        img: posts
      })
    })
    .catch((error) => {
      console.error(error)
      next(error)
    })
})

module.exports = router
