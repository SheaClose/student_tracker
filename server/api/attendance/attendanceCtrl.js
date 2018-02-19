module.exports = {
  getAttendance(req, res) {
    const db = req.app.get('db');
    console.log(req.query);
    db.scripts.attendance
      .get_attendance_by_cohort(req.query, {
        decompose: {
          pk: 'dm_id',
          columns: ['first_name', 'last_name', 'dm_id'],
          attendance: {
            pk: 'date',
            columns: ['date', 'morning', 'break', 'lunch', 'afternoon'],
            array: true
          }
        }
      })
      .then(result => {
        console.log(result);

        res.status(200).json(result);
      })
      .catch(err =>
        console.log(
          `Error getting attendance for cohort ${req.query.cohort_id}`,
          err
        )
      );
  },
  postAttendance(req, res) {
    const db = req.app.get('db');
    const testData = [
      {
        id: 50,
        dm_id: 6764,
        date: '2018-12-02',
        excused: true,
        notes: ['test1', 'test2'],
        morning: 5,
        break: 0,
        lunch: null,
        afternoon: null,
        absent: true
      },
      {
        id: 62,
        dm_id: 6764,
        date: 'CURRENT_DATE',
        excused: true,
        notes: 'test1',
        morning: 5,
        break: 0,
        lunch: 'DEFAULT',
        afternoon: 'DEFAULT',
        absent: true
      }
    ];
    db.scripts.attendance_scripts
      .test_attendance(testData[0])
      .then(result => console.log(result));
    // db.scripts.attendance.save(testData[0]).then(result => console.log(result));

    console.log(res);
  }
};
