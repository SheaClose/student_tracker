const {
  getstudents,
  getOutliers,
  dropStudent,
  getOneOnOnes,
  addOneOnOne,
  getStudentDetails
} = require('./studentCtrl');

module.exports = app => {
  app.get('/api/students/', getstudents);
  app.get('/api/outliers/', getOutliers);
  app.put('/api/students/drop/:id', dropStudent);
  app.get('/api/oneonones/', getOneOnOnes);
  app.post('/api/oneonones', addOneOnOne);
  app.get('/api/students/:dm_id', getStudentDetails);
};
