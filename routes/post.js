const express = require('express')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const { Post } = require('../models')
const { isLoggedIn } = require('./middlewares')

const router = express.Router()

fs.readdir('public/images', (error) => {
  if (error) {
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.')
    fs.mkdirSync('public/images')
  }
})

const upload = multer({
  storage: multer.diskStorage({
    destination (req, file, cb) {
      cb(null, 'public/images/')
    },
    filename (req, file, cb) {
      const ext = path.extname(file.originalname)
      cb(null, path.basename(file.originalname, ext) + ext)
    }
  })
})

router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
  console.log(req.file)
  res.json({ url: `/img/${req.file.filename}` })
})

const upload2 = multer()
router.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
  try {
    const post = await Post.create({
      img: req.body.url,
      userId: req.user.id
    })
    res.redirect('/home')
  } catch (error) {
    console.error(error)
    next(error)
  }
})

module.exports = router
