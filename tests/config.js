const request = require('supertest')
const HOST = "http://127.0.0.1:3000"

module.exports = {
  request: request(HOST),
  agent: request.agent(HOST)
}
