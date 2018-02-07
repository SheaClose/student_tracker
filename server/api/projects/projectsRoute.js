const projectsCtrl = require('./projectsCtrl');

module.exports = app => {
  app.get('/api/projects/:cohort_id', projectsCtrl.getProjects);
};
