const mentorCtrl = require('./mentorCtrl');

module.exports = app => {
  app.get('/api/mentors', mentorCtrl.getMentors);
};
