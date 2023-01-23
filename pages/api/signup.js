import createHandler from '../../lib/index.js'
import db from '../../db/models.js'
import bcrypt from 'bcrypt'
import { ErrorHTTPInvalidRequest } from '../../lib/errors/http.js'

const handler = createHandler()

handler.use((req, res, next) => {
  if (!req.body.username || !req.body.password) {
    throw ErrorHTTPInvalidRequest('No response body')
  }

  next()
})

handler.post(async (req, res) => {
  const { username, password } = req.body
  const user = await db.Users.findOne({ username: username})

  if (!user) {
    try {
      const salt = await bcrypt.genSalt()
      const hash = await bcrypt.hash(password, salt)
      const newUser = new db.Users({
        username: username,
        password: hash
      })

      newUser.save(function(err, user) {
        if (err) {
          /** TODO: handle error */
          return err
        }
      })

      res.status(201).send({ ok: true })
    } catch (e) {
      /** TODO: handle error */
      throw e
    }
  } else {
    res.status(409).send({ 
      ok: false, 
      reason: 'Username already exists'
    })
  }
})

export default handler
