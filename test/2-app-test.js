// global imports
const assert = require('assert');
const request = require('supertest');
// local imports
const app = require('../app');

// TEST GROUP(S):-----------------
describe('The Express App', () => {

  // TEST(S):-----------------
  it('handles a request to root route', (done) => {
    request(app)
      .get('/')
      .end((err, res) => {
        // console.log(res.body);
        assert(res.body.hi === 'there');
        done();
      });
  });
});
