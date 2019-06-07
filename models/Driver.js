// global imports
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PointSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ['Point'],
    default: 'Point'
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

const DriverSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  driving: {
    type: Boolean,
    default: false
  },
  location: PointSchema // embedded document
  /* location: {
    type: PointSchema,
    index: '2dsphere' // will invoke DriverSchema.index({ location: '2dsphere' });
  } */
});

// indexing location property is mandatory while querying geoJSONs
DriverSchema.index({ location: '2dsphere' });

const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;
