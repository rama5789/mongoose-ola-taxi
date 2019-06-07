// local imports
const DriversController = require('../controllers/drivers_controller');

module.exports = (app) => {
  // get drivers
  app.get('/api/drivers', DriversController.index);
  // create a driver
  app.post('/api/drivers', DriversController.create);
  // update a driver
  app.put('/api/drivers/:id', DriversController.edit);
  // delete a driver
  app.delete('/api/drivers/:id', DriversController.delete);
};
