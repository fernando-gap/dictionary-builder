import mongoose, { Schema } from 'mongoose'

const schemas = {}

schemas.userSchema = new Schema({
  username: { 
    type: String, 
    required: true,
    unique: true
  },
  password: { type: String, required: true },
}, { 
  timestamps: true 
})

schemas.wordSchema = new Schema({ 
  word: String
}, { 
  timestamps: true 
})

schemas.customWordSchema = new Schema({
  user: { type: schemas.userSchema, required: true },
  ...schemas.wordSchema.obj
}, { 
  timestamps: true 
})

schemas.collectionSchema = new Schema({
  user: { type: schemas.userSchema, required: true },
  wordsCustom: [schemas.customWordSchema],
  wordsDefault: [schemas.wordSchema]
}, { 
  timestamps: true 
})

// eslint-disable-next-line no-undef
const db = new Proxy({}, {
  get(t, prop) {
    const schema = prop.slice(0, -1).toLowerCase() + 'Schema'
    return mongoose.models[prop] || mongoose.model(prop, schemas[schema])
  }
})

export default db
