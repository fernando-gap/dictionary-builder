require('dotenv').config({
  path: require('path').resolve('../', '.env.local')
});

const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const {
  userSchema,
  wordSchema,
  collectionSchema,
  customWordSchema
} = require('./schema.js')

const User = mongoose.model('Users', userSchema)
const Word = mongoose.model('Words', wordSchema)
const CustomWord = mongoose.model('CustomWords', customWordSchema)
const Collection = mongoose.model('Collections', collectionSchema);

(async () => {
  try {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.connect(process.env.DB_URL_PRODUCTION)
    } else {
      await mongoose.connect(process.env.DB_URL_DEV)
    }
  } catch(e) {
    throw e
    //throw Error('Cannot connect to DATABASE', e)
  }
})()

mongoose.connection.on('connected', e => console.log('connected'))

module.exports = {
  User
}
