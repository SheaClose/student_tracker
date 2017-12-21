const { getUserRoles, getUser } = require('./userCtrl');

module.exports = app => {
  app.get('/api/user/', getUser);
  app.get('/api/user_roles', getUserRoles);
};
