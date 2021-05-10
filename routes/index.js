'use strict'

const express = require('express')
const productCtrl = require('../controllers/product')
const userCtrl = require('../controllers/user')
const postCtrl = require('../controllers/post')
const auth = require('../middlewares/auth')
const api = express.Router()

// Products
api.get('/product', auth, productCtrl.getProducts)
api.get('/product/:productId', productCtrl.getProduct)
api.post('/product', auth, productCtrl.saveProduct)
api.put('/product/:productId', auth, productCtrl.updateProduct)
api.delete('/product/:productId', auth, productCtrl.deleteProduct)

// Posts
api.get('/post', postCtrl.getPosts)
api.get('/post/:postId', postCtrl.getPost)
api.post('/post', auth, postCtrl.savePost)
api.put('/post/:postId', auth, postCtrl.updatePost)
api.delete('/post/:postId', auth, postCtrl.deletePost)

// Sign in / Sign up
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)

// Private resource test (auth in middle)
api.get('/private', auth, function (req, res) {
    res.status(200).send({message: 'Tienes acceso'})
})

module.exports = api