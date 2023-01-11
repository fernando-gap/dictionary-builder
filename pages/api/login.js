import passport from "passport"
import nextConnect from "next-connect";

import { localStrategy } from "../../lib/strategy.js"
import { withIronSessionApiRoute } from 'iron-session/next';
import { ironConfig } from "../../lib/config.js"

passport.use(localStrategy);
const authenticate = (method, req, res) =>
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) {
        reject(error)
      } else {
        resolve(token)
      }
    })(req, res)
  });

const handler = nextConnect()
  .use(passport.initialize())
  .use(async (req, res, next) => {
      const user = await authenticate('local', req, res);
      req.session.user = user
      next();
  })

export default withIronSessionApiRoute(
  async function loginRoute(req, res) {
    try {
      await handler.run(req, res)
      await req.session.save()
    } catch (e) {
      /** TODO: handle error **/
      console.log(e)
    }
    console.log('API ROUTE: ', req.session)
    res.send({ ok: true })
  }, ironConfig
)
