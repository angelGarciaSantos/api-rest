'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = Schema({
    title: String,
    content: String, 
    user: String,
    userId: String,
    date: Date, 
})

module.exports = mongoose.model('Post', PostSchema)