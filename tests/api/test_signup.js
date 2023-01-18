const expect = require('chai').expect
const supertest = require('supertest')
const { agent } = require('../config.js')

describe('Signup', function() {
  context('POST /api/signup', function() {
    it('Create user', function(done) {
      agent
        .post('/api/signup')
        .send({ username: 'adm___2', password: 'adm___2' })
        .expect(201, { ok: true }, done)
    })
    it('Test invalid input', function(done) {
      agent
        .post('/api/signup')
        .send({ username: '*Heo/(){}&', password: 'adm___2' })
        .expect(400, { ok: false }, done)
    })
  })
})
