const { request } = require('../config.js');

describe('POST /api/login', function() {
  it('Login correct credentials', function(done) {
    request
      .post('/api/login')
      .set('Content-Type', 'application/json')
      .send({
        username: 'adm',
        password: 'adm'
      })
      .expect(200, { ok: true }, done)
  })
  it('Login wrong credentials', function(done) {
    request
      .post('/api/login')
      .set('Content-Type', 'application/json')
      .send({
        username: 'null',
        password: 'null'
      })
      .expect(401, { ok: false }, done)
  })
})
