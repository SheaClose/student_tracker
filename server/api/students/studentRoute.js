const { getstudents, getOutliers, dropStudent } = require('./studentCtrl');

module.exports = app => {
  app.get('/api/students/', getstudents);
  app.get('/api/outliers/', getOutliers);
  app.put('/api/students/drop/:id', dropStudent);
};
