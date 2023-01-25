const expect = require('chai').expect
const supertest = require('supertest')
const { agent } = require('../config.js')
const { spawnSync } = require('child_process')

describe('Signup', function() {
  before(function() {
    spawnSync('npm', ['run', 'db:reset'])
    return true
  })
  context('POST /api/signup', function() {
    it('Create user', function(done) {
      agent
        .post('/api/signup')
        .send({ username: 'adm', password: 'adm' })
        .expect(201, { ok: true }, done)
    })
    it('Test invalid input', function(done) {
      agent
        .post('/api/signup')
        .send({ username: '*Heo/(){}&', password: 'adm___2' })
        .expect(400, { ok: false }, done)
    })
    it('Don\'t create duplicates', function(done) {
      agent
        .post('/api/signup')
        .send({ username: 'adm', password: 'adm' })
        .expect(409, { 
          ok: false, 
          reason: "Username already exists"
        }, done)
    })
  })
})
