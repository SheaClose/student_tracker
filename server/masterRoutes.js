const userRoutes = require('./api/user/userRoutes');
const studentRoutes = require('./api/students/studentRoute');
const reposRoutes = require('./api/repos/reposRoute');
const projectsRoutes = require('./api/projects/projectsRoute');
const attendanceRoutes = require('./api/attendance/attendanceRoute');

module.exports = app => {
  userRoutes(app);
  studentRoutes(app);
  reposRoutes(app);
  projectsRoutes(app);
  attendanceRoutes(app);
};
