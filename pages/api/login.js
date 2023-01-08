import passport from "passport";
import nextConnect from "next-connect";
import { localStrategy } from "../../lib/strategy.js"

passport.use(localStrategy);

 const authenticate = (method, req, res) =>
  new Promise((resolve, reject) => {
    const options = {
      successRedirect: '/search',
      failureRedirect: '/login'
    };
    passport.authenticate(method, options, (error, token) => {
      if (error) {
        reject(error)
      } else {
        resolve(token)
      }
    })(req, res)
  })

export default nextConnect()
  .use(passport.initialize())
  .post(async (req, res) => {
    try {
      await authenticate('local', req, res)
      res.redirect('/search')
    } catch (e) {
      res.status(401).send(e.message)
    }
  })
