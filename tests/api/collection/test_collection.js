const { request, agent } = require('../../config.js');
const expect = require('chai').expect
const should = require('chai').should();

describe('Collections', function() {
  agent
    .post('/api/login')
    .send({ username: 'adm', password: 'adm' })
    .expect(200, {ok: true})

  context('POST api/get/collection', function() {
    it('get all user\'s collections', function(done) {
      agent
        .post('/api/get/collection')
        .set('Content-Type', 'application/json')
        .send({ collection: 'Default 1' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body.collection).to.equal('Default 1')
          return done();
        })
    })

    it('Fail to get collection without authentication', function(done) {
      request
        .get('/api/get/collection/test')
        .set('Content-Type', 'application/json')
        .expect(401, { error: 'Unauthorized Access' }, done)
    })
  })

  context('POST api/create/collection', function(done) {
    it('Create collection', function(done) {
      agent
        .get('/api/create/collection')
        .set('Content-Type', 'application/json')
        .send({ collection: 'newCollection' })
        .expect(200, { ok: true }, done)
    })    

    it('Fail create collection without authentication', function(done) {
      request
        .get('/api/create/collection')
        .set('Content-Type', 'application/json')
        .expect(401, { error: 'Unauthorized Access' }, done)
    })
  })

  context('DELETE api/remove/collection', function(done) {
    it('Remove collection', function(done) {
      agent
        .delete('/api/create/collection')
        .set('Content-Type', 'application/json')
        .send({ collection: 'newCollection' })
        .expect(200, { ok: true }, done)
    })

    it('Fail to delete collection without authentication', function(done) {
      request
        .delete('/api/create/collection')
        .send({ collection: 'newCollection' })
        .expect(401, { error: 'Unauthorized Access' }, done)
    })
  })

  context('PUT api/update/collection', function(done) {
    it('Update collection', function(done) {
      agent
        .delete('/api/create/collection')
        .set('Content-Type', 'application/json')
        .send({ collection: 'newCollection', renameto: 'renamedCollection'})
        .expect(200, { ok: true }, done)
    })

    it('Fail to upload collection without authentication', function(done) {
      request
        .delete('/api/create/collection')
        .set('Content-Type', 'application/json')
        .send({ collection: 'newCollection', renameto: 'renamedCollection'})
        .expect(401, { error: 'Unauthorized Access' }, done)
    })
  })
})

