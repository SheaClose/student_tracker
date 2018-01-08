const projectsCtrl = require('./projectsCtrl');

module.exports = app => {
  app.get('/api/projects/getProjects/:id', projectsCtrl.getProjects);
};
