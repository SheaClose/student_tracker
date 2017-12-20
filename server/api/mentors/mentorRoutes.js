const { getMentorRoles, getMentor } = require('./mentorCtrl');

module.exports = app => {
  app.get('/api/mentor/', getMentor);
  app.get('/api/mentor_roles', getMentorRoles);
};
