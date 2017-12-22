const userRoutes = require('./api/user/userRoutes');
const studentRoutes = require('./api/students/studentRoute');
const reposRoutes = require('./api/repos/reposRoute');

module.exports = app => {
  userRoutes(app);
  studentRoutes(app);
  reposRoutes(app);
};
