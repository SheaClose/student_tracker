const { getstudents, getOutliers } = require('./studentCtrl');

module.exports = app => {
  app.get('/api/students/', getstudents);
  app.get('/api/outliers/', getOutliers);
};
