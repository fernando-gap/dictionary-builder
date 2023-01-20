import mongoose from 'mongoose'
import path from 'path'
import dotenv from 'dotenv'

import {
  DatabaseConnectionError,
  UnexpectedDatabaseError,
  DatabaseURLNotSet
} from '../lib/errors/database.js'

dotenv.config({
  path: path.resolve('../', '.env.local')
})

const conf = {
  NODE_ENV: process.env.NODE_ENV,
  DB_DEV: process.env.DB_URL_DEV,
  DB_PROD: process.env.DB_URL_PROD,
}

if (conf.NODE_ENV === 'production') {
  if (!conf.DB_PROD) {
    throw new DatabaseURLNotSet('Enviroment variable: DB_URL_PRODUCTION')
  }
} else {
  if (!conf.DB_DEV) {
    throw new DatabaseURLNotSet('Enviroment variable: DB_URL_DEV')
  }
}

mongoose.set('strictQuery', true)

mongoose.connection.on('connected', () => {
  console.log('MongoDB: connected')
})
mongoose.connection.on('error', e => {
  console.log('MongoDB: error: ', e)
  throw UnexpectedDatabaseError(e.message)
})
mongoose.connection.on('disconnected', () => {
  console.log('MongoDB: disconnected')
})

/* Middle to use in api routes **/
const databaseMiddleware = async (req, res, next) => {
  try {
    if (!global.mongoose) {
      if (conf.NODE_ENV === 'production') {
        global.mongoose = await mongoose.connect(conf.DB_PROD)
      } else {
        global.mongoose = await mongoose.connect(conf.DB_DEV)
      }
    }
  } catch(e) {
    throw new DatabaseConnectionError(e.message)
  }
  return next()
}

export default databaseMiddleware

