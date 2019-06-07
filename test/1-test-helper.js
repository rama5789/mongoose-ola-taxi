// global imports
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// test Database
const DATABASE = 'mongodb://localhost:27017/ola_test';
const options = {
  useNewUrlParser: true
};

// TEST SUITE:-----------------
// This hook executes only once per test suite globally
before((done) => {
  mongoose.connect(DATABASE, options);
  mongoose.connection
    .once('open', () => {
      console.log(`Connected to → DB ${DATABASE}`);
      done();
    })
    .on('error', (err) => {
      console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
    });
});

// DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
// This hook executes before begining of each test globally
beforeEach(done => {
  // By default, mongoose lowercases all the collection names
  const { drivers } = mongoose.connection.collections;
  drivers.drop()
    // create all necessary indexes related to driver collection
    // .then(() => drivers.ensureIndex({ location: '2dsphere' }))
    .then(() => drivers.createIndex({ location: '2dsphere' }))
    .then(() => done())
    .catch(() => done());
});
