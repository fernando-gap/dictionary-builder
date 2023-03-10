import passport from 'passport'
import createHandler from '../../lib/index.js'

import { localStrategy } from '../../lib/strategy.js'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironConfig } from '../../lib/config.js'

passport.use(localStrategy)
const authenticate = (method, req, res) =>
  // eslint-disable-next-line no-undef
  new Promise((resolve, reject) => {
    passport.authenticate(method, { session: false }, (error, token) => {
      if (error) {
        reject(error)
      } else {
        resolve(token)
      }
    })(req, res)
  })

const handler = createHandler()
  .use(passport.initialize())
  .use((req, res, next) => {
    if (req.method != 'POST') {
      throw Error(`Invalid Request Method ${req.method}`)
    }
    if (!req.body.password || !req.body.username) {
      throw Error('Invalid Body Data')
    }
    next()
  })
  .post(async (req, res, next) => {
    const user = await authenticate('local', req, res)
    req.session.user = user
    next()
  })

export default withIronSessionApiRoute(
  async function loginRoute(req, res) {
    try {
      await handler.run(req, res)
      await req.session.save()
      res.send({ ok: true })
    } catch (e) {
      /** TODO: handle error **/
      res.status(401).send({ ok: false })
    }
  }, ironConfig
)
