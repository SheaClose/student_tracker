const mentors = require('./api/mentors/mentorRoutes');

module.exports = app => {
  mentors(app);
};
