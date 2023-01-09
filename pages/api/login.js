import passport from "passport";
import session from "express-session";
import nextConnect from "next-connect";

import { localStrategy } from "../../lib/strategy.js"

passport.use(localStrategy);

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, {
      id: user.id,
      username: user.username,
    });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

const options = {
  secret: 'test',
  cookie: { secure: false },
  saveUnitialize: false,
  resave: false
}

 const authenticate = (method, req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: true }, (error, token) => {
      if (error) {
        reject(error)
      } else {
        req.login(token, err => {
          if (err) {
            res.status(401).send(err.message)
          }
          resolve(token)
        })
      }
    })(req, res)
  })

export default nextConnect()
  .use(passport.initialize())
  .use(session(options))
  .use(passport.session())
  .post(async (req, res) => {
    try {
      await authenticate('local', req, res)
      res.status(200).send({ done: true })
    } catch (e) {
      res.status(401).send(e.message)
    }
  })
