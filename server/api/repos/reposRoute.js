const reposCtrl = require('./reposCtrl');

module.exports = app => {
  app.get('/api/repos', reposCtrl.getRepos);
};
