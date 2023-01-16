const { model } = require('mongoose');
const {
  userSchema,
  wordSchema,
  collectionSchema,
  customWordSchema
} = require('./schema.js')

const User = model('Users', userSchema)
const Word = model('Words', wordSchema)
const CustomWord = model('CustomWords', customWordSchema)
const Collection = model('Collections', collectionSchema)
