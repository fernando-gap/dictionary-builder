import db from '../../../db/models.js'
import createHandler from '../../../lib/index.js'
import { withIronSessionApiRoute } from 'iron-session/next'
import { ironConfig } from '../../../lib/config.js'

const handler = createHandler()

handler.use((req, res, next) => {
  if (!req.session || !req.body.collection) {
    return res.status(422).send({error: 'Unprocessable Entitity'})
  }

  if (!req.session.user) {
    console.log(req.session)
    return res.status(401).send({ error: 'Unauthorized Access'})
  }

  return next()
})

handler.post(async (req, res) => {
  const { user } = req.session
  const collection = req.body.collection
  try {
    const newCollection = new db.Collections({ name: collection })
    await db.Users.updateOne({ username: user.username }, {
      $push: {
          collections: newCollection
      }
    })
    return res.status(201).send({ok: true})
  } catch (e) {
    return res.status(422).send({error: 'Unprocessable Entitity'})
  }
})

async function executeHandler(req, res) {
  await handler.run(req, res)
}

export default withIronSessionApiRoute(executeHandler, ironConfig)