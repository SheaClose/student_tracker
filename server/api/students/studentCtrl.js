const { groupById, groupRowData, objToArray } = require('../utils/groupData');

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
    /** get list of cohorts for current user */
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
        const absencesData = await db.students.get_absence_outliers({
          cohorts
        });
        const tardiesData = await db.students.get_tardies_outliers({
          cohorts
        });
        const projectsData = await db.students.get_project_outliers({
          cohorts
        });
        const oneononesData = await db.students.get_oneonone_outliers({
          cohorts
        });
        const attendance = formatAttendanceData(absencesData, tardiesData);

        const formattedProjects = {};
        groupById(projectsData, formattedProjects);
        groupRowData(projectsData, formattedProjects, 'projects');
        const projects = objToArray(formattedProjects);

        const formattedOneonones = {};
        groupById(oneononesData, formattedOneonones);
        groupRowData(oneononesData, formattedOneonones, 'oneonones');
        const oneonones = objToArray(formattedOneonones);

        return res.status(200).json({
          attendance,
          projects,
          formattedProjects,
          formattedOneonones,
          oneonones
        });
      } catch (e) {
        console.log(e);
        return res.status(500).json('Async Error');
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
