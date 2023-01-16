const { Schema } = require('mongoose')

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Date, required: true }
})

const wordSchema = new Schema({ word: String })

/*
 * No use of discriminator (inheritance in other terms)
 * because we need to track two different collections
 * with the same type that have a user with custom properties
 * and the other with default ones.
 */
const customWordSchema = new Schema({
  user: { type: userSchema, required: true },
  ...wordSchema.obj
})

const collectionSchema = new Schema({
  user: { type: userSchema, required: true },
  wordsCustom: [customWordSchema],
  wordsDefault: [wordSchema]
})

module.exports {
  collectionSchema,
  userSchema,
  wordSchema,
  customWordSchema
}
