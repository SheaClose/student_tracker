const { getstudents } = require('./studentCtrl');

module.exports = app => {
  app.get('/api/students/', getstudents);
};
