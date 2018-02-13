const { groupById, groupRowData, objToArray } = require('../utils/groupData');

module.exports = {
  getAttendance(req, res) {
    const db = req.app.get('db');

    db.attendance.get_attendance_by_cohort(req.query).then(result => {
      const attendance = {};
      groupById(result, attendance);
      groupRowData(result, attendance, 'attendance');
      res.json(objToArray(attendance));
    });
  },
  postAttendance(req, res) {
    console.log(res);
  }
};
