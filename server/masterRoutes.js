const mentorRoutes = require('./api/mentors/mentorRoutes');
const studentRoutes = require('./api/students/studentRoute');

module.exports = app => {
  mentorRoutes(app);
  studentRoutes(app);
};
