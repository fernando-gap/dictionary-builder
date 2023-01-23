import LocalStrategy from 'passport-local'
import db from '../db/models.js'
import bcrypt from 'bcrypt'
import { ErrorHTTPUnauthorizedRequest } from './errors/http.js'

export const localStrategy = new LocalStrategy(
  async function(username, password, done) {
    const user = await db.Users.findOne({ username: username })
    console.log(user)
    if (user) {
      if (await bcrypt.compare(password, user.password))
        return done(null, user)
    }
    return done(new ErrorHTTPUnauthorizedRequest('Invalid Username or Password'))
})
