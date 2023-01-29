/* eslint-disable no-undef */
const { request, agent } = require('../config.js')
const expect = require('chai').expect
const should = require('chai').should()

describe('Collections', function() {
  it('Login', function(done) {
    agent
      .post('/api/login')
      .send({ username: 'adm', password: 'adm' })
      .expect(200, {ok: true}, done)
  })

  context('POST api/get/collection', function() {
    it('GET collection', function(done) {
      agent
        .post('/api/get/collection')
        .set('Content-Type', 'application/json')
        .send({ collection: 'Default' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err)
          expect(res.body.collection).to.equal('Default')
          return done()
        })
    })
  })

  context('POST api/add/collection', function() {
    it('CREATE collection', function(done) {
      agent
        .post('/api/add/collection')
        .set('Content-Type', 'application/json')
        .send({ collection: 'newCollection' })
        .expect(201, { ok: true }, done)
    })    
  })

  context('DELETE api/remove/collection', function() {
    it('Remove collection', function(done) {
      agent
        .delete('/api/remove/collection')
        .set('Content-Type', 'application/json')
        .send({ collection: 'newCollection' })
        .expect(202, { ok: true }, done)
    })
  })

  context.skip('PUT api/update/collection', function() {
    it('Update collection', function(done) {
      agent
        .put('/api/create/collection')
        .set('Content-Type', 'application/json')
        .send({ collection: 'newCollection', renameto: 'renamedCollection'})
        .expect(200, { ok: true }, done)
    })
  })
})