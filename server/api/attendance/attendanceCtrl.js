const attendanceDecompose = {
  decompose: {
    pk: 'dm_id',
    columns: ['first_name', 'last_name', 'dm_id'],
    attendance: {
      pk: 'date',
      columns: ['date', 'morning', 'break', 'lunch', 'afternoon', 'id']
    }
  }
};

module.exports = {
  getAttendance(req, res) {
    const db = req.app.get('db');
    const { cohort_id } = req.query;
    const date = new Date(req.query.date);

    db.scripts.attendance
      .get_attendance_by_cohort({ cohort_id, date }, attendanceDecompose)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        console.log(
          `Error getting attendance for cohort ${
            req.query.cohort_id
          } on ${date}`,
          err
        );
        res.status(500).json(err);
      });
  },
  postAttendance(req, res) {
    const db = req.app.get('db');
    const { cohort_id, date } = req.body;
    const updates = req.body.values.map(student =>
      db.attendance
        .save({
          ...student.attendance,
          dm_id: student.dm_id
        })
        .catch(err =>
          console.log(`Error saving attendance for ${student.dm_id}`, err)
        )
    );

    Promise.all(updates)
      .then(() =>
        db.scripts.attendance.get_attendance_by_cohort(
          {
            cohort_id,
            date
          },
          attendanceDecompose
        )
      )
      .then(results => res.json(results))
      .catch(err =>
        console.log('Error getting new attendance after update', err)
      );
  }
};
