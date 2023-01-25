import mongoose, { Schema, ObjectId } from 'mongoose'
import { ErrorUndefinedCollection } from '../lib/errors/database.js'

const schemas = {}

schemas.wordSchema = new Schema({ 
  word: {
    type: String,
    unique: true,
    required: true
  }
}, { 
  timestamps: true 
})

schemas.customWordSchema = new Schema({
  user: { 
    type: ObjectId, 
    ref: 'Users'
  },
  ...schemas.wordSchema.obj
}, { 
  timestamps: true 
})

schemas.collectionSchema = new Schema({
  name: {
    type: String,
    required: true,
    default: 'Default'
  },
  wordsCustom: {
    type: [ObjectId],
    ref: 'WordsCustom',
    default: () => ([])
  },
  wordsDefault: {
    type: [ObjectId],
    ref: 'Words',
    default: () => ([])
  }
}, { 
  timestamps: true 
})

schemas.userSchema = new Schema({
  username: { 
    type: String, 
    required: true,
    unique: true
  },
  password: {
     type: String, 
     required: true
  },
  collections: {
    type: [schemas.collectionSchema],
    unique: true,
    default: () => ({})
  }
}, { 
  timestamps: true 
})


// eslint-disable-next-line no-undef
const db = new Proxy({}, {
  get(t, prop) {
    const schema = prop.slice(0, -1).toLowerCase() + 'Schema'
    if (schema in schemas) {
      return mongoose.models[prop] || mongoose.model(prop, schemas[schema])
    }
    throw ErrorUndefinedCollection(`${prop} does not have an ${schema}`)
  }
})

export default db
