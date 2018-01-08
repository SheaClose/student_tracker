const userRoutes = require('./api/user/userRoutes');
const studentRoutes = require('./api/students/studentRoute');
const reposRoutes = require('./api/repos/reposRoute');
const projectsRoutes = require('./api/projects/projectsRoute');

module.exports = app => {
  userRoutes(app);
  studentRoutes(app);
  reposRoutes(app);
  projectsRoutes(app);
};
