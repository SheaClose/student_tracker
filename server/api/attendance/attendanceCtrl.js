const attendanceDecompose = {
  decompose: {
    pk: 'dm_id',
    columns: ['first_name', 'last_name', 'dm_id'],
    attendance: {
      pk: 'date',
      columns: [
        'date',
        'morning',
        'break',
        'lunch',
        'afternoon',
        'id',
        'absent'
      ]
    }
  }
};

module.exports = {
  getAttendance(req, res) {
    const db = req.app.get('db');
    const { cohort_id } = req.query;

    // req.query.date is a string, massive needs a date object
    const date = new Date(req.query.date);

    db.scripts.attendance
      .get_attendance_by_cohort({ cohort_id, date }, attendanceDecompose)
      .then(result => res.status(200).json(result))
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

    /* The front end sends the entire cohort's attendance
    data for the selected date. If there's already data for
    that date, it should have an id. .save() will update that
    id's row OR insert a new row if there isn't an ID.

    TODO: Make sure that there can only be one id per date
    per student.
    TODO: There might be something funky with time zones here.
    At one point I was posting after 6pm and it was showing in
    the DB as the following day
    */
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

    /* After all the updates happen, get the
    cohort's attendance and send to the front end */

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
