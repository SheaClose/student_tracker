const attendanceCtrl = require('./attendanceCtrl');

module.exports = app => {
  app.get('/api/attendance/', attendanceCtrl.getAttendance);
  app.post('/api/attendance', attendanceCtrl.postAttendance);
};
