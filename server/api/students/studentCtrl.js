const { groupById, groupRowData, objToArray } = require('../utils/groupData');

const projectsDecompose = {
  decompose: {
    pk: 'dm_id',
    columns: ['first_name', 'last_name', 'total_incomplete', 'dm_id'],
    projects: {
      pk: 'id',
      columns: ['name', 'due_date', 'completion', 'id'],
      array: true
    }
  }
};
const oneononesDecompose = {
  decompose: {
    pk: 'dm_id',
    columns: ['first_name', 'last_name', 'dm_id'],
    oneonones: {
      pk: 'id',
      columns: [
        'id',
        'notes',
        'attitude',
        'skill',
        'confidence_skill',
        'confidence_personal',
        'defer_drop_concern',
        'worried',
        'personal_project_ability',
        'date',
        'user_id'
      ],
      array: true
    }
  }
};

const formatAttendanceData = (absences, tardies) => {
  const attendance = {};
  groupById(absences, attendance);
  groupById(tardies, attendance);
  groupRowData(absences, attendance, 'absences');
  groupRowData(tardies, attendance, 'tardies');

  return objToArray(attendance);
};

module.exports = {
  getstudents(req, res) {
    const db = req.app.get('db');
    db.students
      .get_students(req.query.cohort)
      .then(students => res.json(students))
      .catch(err => console.log('Error getting students', err));
  },
  async getOutliers(req, res) {
    if (req.user) {
      const { cohorts } = req.user;

      const db = req.app.get('db');
      try {
        const absencesData = await db.outliers.get_absence_outliers({
          cohorts
        });

        const tardiesData = await db.outliers.get_tardies_outliers({
          cohorts
        });
        console.log(tardiesData);
        const projects = await db.outliers.get_project_outliers(
          { cohorts },
          projectsDecompose
        );
        const oneonones = await db.outliers.get_oneonone_outliers(
          { cohorts },
          oneononesDecompose
        );

        const attendance = formatAttendanceData(absencesData, tardiesData);

        return res.status(200).json({
          attendance,
          projects,
          oneonones
        });
      } catch (e) {
        console.log(e);
        return res.status(500).json('Error getting outlier information');
      }
    }
    return res.status(500).json('User not logged in');
  },
  dropStudent(req, res) {
    const { id } = req.params;
    const db = req.app.get('db');
    db.students
      .drop_student(id)
      .then(resp => {
        if (resp.length) {
          return res.status(200).json(id);
        }
        return res.status(204).json(id);
      })
      .catch(console.log);
  },
  getOneOnOnes(req, res) {
    const db = req.app.get('db');
    const { cohort } = req.query;
    db.students
      .get_oneonones(cohort)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(console.log);
  },
  addOneOnOne(req, res) {
    const db = req.app.get('db');
    db.students
      .add_oneonone(req.body)
      .then(() => {
        db.students
          .get_oneonones(req.body.cohort)
          .then(response => res.status(200).json(response))
          .catch(console.log);
      })
      .catch(console.log);
  },
  getStudentDetails(req, res) {
    res.json('unavailable');
    /* One day this will work.
    const db = req.app.get('db');
    db.students
      .get_student_details(req.params)
      .then(result => res.json(result))
      .catch(err =>
        console.log('Error retrieving student details', req.params, err)
      );
      */
  }
};
