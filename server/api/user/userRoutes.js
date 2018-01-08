const {
  isLoggedIn,
  getUserRoles,
  getUser,
  updateDefaultCohort
} = require('./userCtrl');

module.exports = app => {
  app.get('/api/user/', getUser);
  app.get('/api/user_roles', getUserRoles);
  app.get('/api/isLogged', isLoggedIn);
  app.put('/api/user/default_cohort', updateDefaultCohort);
};
