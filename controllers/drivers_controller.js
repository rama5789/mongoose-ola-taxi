// local imports
const Driver = require('../models/Driver');

module.exports = {
  index(req, res, next) {
    const { lng, lat } = req.query;

    Driver.find({
      location: {
        $near: {
          $geometry: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
          $maxDistance: 200000, // 200km
          // $maxDistance: 20000000, // 20,000km (will include both values)
        }
      }
    })
      .then(drivers => res.send(drivers))
      .catch(next);
  },

  create(req, res, next) {
    const driverProps = req.body;

    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch(next)
  },

  edit(req, res, next) {
    const driverId = req.params.id;
    const driverProps = req.body;

    Driver.findByIdAndUpdate(driverId, driverProps)
      .then(() => Driver.findById({ _id: id }))
      .then(driver => res.send(driver))
      .catch(next);
  },

  delete(req, res, next) {
    const driverId = req.params.id;

    // Driver.findByIdAndRemove({ _id: driverId })
    Driver.findByIdAndDelete(driverId)
      .then(driver => res.status(204).send(driver))
      .catch(next);
  }
};
