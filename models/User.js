const mongoose = require('mongoose')
const Schema = mongoose.Schema
//const { Schema } = mongoose; <-- this means the same thing as line 2

const userSchema = new Schema({
  googleId: String
})

mongoose.model('users', userSchema)
