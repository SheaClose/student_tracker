const userRoutes = require('./api/user/userRoutes');
const studentRoutes = require('./api/students/studentRoute');

module.exports = app => {
  userRoutes(app);
  studentRoutes(app);
};
