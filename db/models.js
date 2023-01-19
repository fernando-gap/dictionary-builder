import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
}, { timestamps: true })

const wordSchema = new Schema({ 
  word: String 
}, { timestamps: true })

const customWordSchema = new Schema({
  user: { type: userSchema, required: true },
  ...wordSchema.obj
}, { timestamps: true })

const collectionSchema = new Schema({
  user: { type: userSchema, required: true },
  wordsCustom: [customWordSchema],
  wordsDefault: [wordSchema]
}, { timestamps: true })


const proxy = new Proxy({}, {
  get(t, prop, r) {
    const schema = prop.slice(0, -1).toLowerCase() + 'Schema'
    return mongoose.models[prop] || mongoose.model(prop, this[schema])
  }
})

export const User = proxy.Users
export const Word = proxy.Words
export const CustomWord = proxy.CustomWords
export const Collection = proxy.Collections
