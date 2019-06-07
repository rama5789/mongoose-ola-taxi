// global imports
const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
// local imports
const app = require('../../app');

const Driver = mongoose.model('driver');

// TEST GROUP(S):-----------------
describe('Drivers controller - 1', () => {

  // TEST(S):-----------------
  // DeprecationWarning: collection.count is deprecated, and will be removed in a future version. Use collection.countDocuments or collection.estimatedDocumentCount instead
  it('Post to /api/drivers creates a new driver', (done) => {
    // Driver.count()
    Driver.countDocuments()
      .then(count => {
        request(app)
          .post('/api/drivers')
          .send({ email: 'test@test.com' })
          .end((err, res) => {
            // console.log(res.body);
            // Driver.count()
            Driver.countDocuments()
              .then(newCount => {
                assert(count + 1 === newCount);
                done();
              });
          });
      });
  });

  it('Post to /api/drivers requires an email', (done) => {
    request(app)
      .post('/api/drivers')
      .send({})
      .end((err, res) => {
        // console.log(res.body);
        assert(res.body.error);
        done();
      });
  });

  it('Put to /api/drivers/:id can update a record', done => {
    const driver = new Driver({ email: 'test@test.com', driving: false });
    driver.save()
      .then(() => {
        request(app)
          .put(`/api/drivers/${driver._id}`)
          .send({ driving: true })
          .end((err, res) => {
            // console.log(res.body);
            Driver.findOne({ email: 'test@test.com' })
              .then(driver => {
                // console.log(driver);
                assert(driver.driving === true);
                done();
              });
          });
      });
  });

  it('Delete to /api/drivers/:id can delete a record', done => {
    const driver = new Driver({ email: 'test@test.com' });
    driver.save()
      .then(() => {
        request(app)
          .delete(`/api/drivers/${driver._id}`)
          .end((err, res) => {
            // console.log(res.body);
            // Driver.count()
            Driver.countDocuments()
              .then(count => {
                assert(count === 0);
                done();
              });
          });
      });
  });
});
