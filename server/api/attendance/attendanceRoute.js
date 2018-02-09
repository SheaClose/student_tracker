const attendanceCtrl = require('./attendanceCtrl');

module.exports = app => {
  app.get('/api/attendance/:cohort_id', attendanceCtrl.getAttendance);
  app.put('/api/attendance/completion/:id', attendanceCtrl.updateCompletion);
};
