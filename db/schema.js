const { Schema } = require('mongoose')

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  collections: { type: [String] }
}, { timestamps: true })

const wordSchema = new Schema({ 
  word: String 
}, { timestamps: true })

/*
 * No use of discriminator (inheritance in other terms)
 * because we need to track two different collections
 * with the same type that have a user with custom properties
 * and the other with default ones.
 */
const customWordSchema = new Schema({
  user: { type: userSchema, required: true },
  ...wordSchema.obj
}, { timestamps: true })

const collectionSchema = new Schema({
  user: { type: userSchema, required: true },
  wordsCustom: [customWordSchema],
  wordsDefault: [wordSchema]
}, { timestamps: true })

module.exports = {
  collectionSchema,
  userSchema,
  wordSchema,
  customWordSchema
}
