const { groupById, groupRowData, objToArray } = require('../utils/groupData');

/**
 * This is purely for development. Provides a dummy session for mentors who've
 * only mentored once (to see what it would look like with multiple cohorts.)
 */
const dummyCohort = require('../../../configs/cohort');

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
    db
      .run('select cohort_id from user_cohort where user_id = $1', req.user.id)
      .then(ids => ids.map(cur => cur.cohort_id))
      .then(cohortIds => {
        const cohortPromisese = cohortIds.map(async cohortid => {
          const cohorts = await db.run(
            `select * from cohorts 
                where cohort_id = $1`,
            cohortid
          );
          const cohortPromises = cohorts.map(
            ({ id, date_start, date_end, name }) => {
              const inSession =
                new Date(date_start).getTime() < Date.now() &&
                new Date(date_end).getTime() > Date.now();
              return db
                .run('select * from students where cohort_id = $1', name)
                .then(studentList => ({
                  inSession,
                  id,
                  date_start,
                  date_end,
                  name,
                  classSession: studentList.map(
                    ({ dm_id, first_name, last_name, email }) => ({
                      dm_id,
                      first_name,
                      last_name,
                      email
                    })
                  )
                }))
                .catch(err => console.log('Problem  getting students', err));
            }
          );
          return Promise.all(cohortPromises).then(c => c[0]);
        });
        Promise.all(cohortPromisese)
          .then(cohorts =>
            [...cohorts, dummyCohort].sort(
              (a, b) => +a.name.replace(/\D/g, '') - +b.name.replace(/\D/g, '')
            )
          )
          .then(cohorts => res.json(cohorts))
          .catch(console.log);
      })
      .catch(console.log);
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
      .then(response => res.status(200).json(response))
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
  }
};
