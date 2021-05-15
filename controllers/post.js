'use strict'

const Post = require('../models/post')
const user = require('../models/user')
const User = require('../models/user')

function getPost (req, res) {
    let postId = req.params.postId

    Post.findById(postId, (err, post) => {
        if (err)  return  res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if (!post) return res.status(404).send({message: `El tema no existe`})

        return res.status(200).send({ post: post })
    })
}

function getPosts (req, res) {
    Post.find({}, (err, posts) =>{
        if (err)  return  res.status(500).send({message: `Error al realizar la petición: ${err}`})
        if (!posts) return res.status(404).send({message: `No existen temas`})

        return res.send(200, {posts: posts})
    })
}

function savePost (req, res) {
    console.log('POST /api/post')
    console.log(req.body)

    let date = new Date()

    let post = new Post()
    post.title = req.body.title
    post.content = req.body.content
    post.user = req.body.user
    post.userId = req.user
    post.date = date

    post.save((err, postStored) => {
        if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

        res.status(200).send({post: postStored})
    })

}

function updatePost (req, res) {
    let postId = req.params.postId
    let update = req.body

    Post.findByIdAndUpdate(postId, update, (err, postUpdated) => {
        if (err)  return  res.status(500).send({message: `Error al actualizar el tema: ${err}`})
        res.status(200).send({ post: postUpdated })
    })
}

function deletePost (req, res) {
    let postId = req.params.postId
    let userId = req.user
    let isUserAdmin = false;

    User.findById(userId), (err, user) => {
        if (err)  return  res.status(500).send({message: `Error accediendo al usuario al borrar el tema: ${err}`})

        console.log(user);
        isUserAdmin = user.admin;
    }

    Post.findById(postId, (err, post) => {
        if (err)  return  res.status(500).send({message: `Error al borrar el tema: ${err}`})
        if (!(isUserAdmin) && (post.userId != userId)) return  res.status(403).send({message: `No estas autorizado para borrar el tema: ${isUserAdmin}`})

        post.remove(err => {
            if (err)  return  res.status(500).send({message: `Error al borrar el tema: ${err}`})
            res.status(200).send({ message: 'El producto ha sido eliminado' })
        })
    })
}

module.exports = {
    getPost,
    getPosts,
    savePost,
    updatePost,
    deletePost
}