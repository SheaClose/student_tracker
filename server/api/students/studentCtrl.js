const configPath = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
const { authHeaders } = require(`../../../configs/${configPath}.config`);
const axios = require('axios');

/**
 * TODO: remove 'cohort' for production
 */
const cohort = require('../../../configs/cohort');

module.exports = {
  getstudents(req, res) {
    const { sessions } = req.session.devmtnUser;
    const sessionPromises = sessions.map(session =>
      axios.get(
        `https://devmountain.com/api/classsession/enrollments/${session.id}`,
        authHeaders
      )
    );
    /**
     * since we are potentially getting multiple sessions, we await all responses
     * before sending back to the front end.
     */
    axios
      .all(sessionPromises)
      .then((...rest) => {
        /**
         * remove dropped/withdrawn students before returning
         */
        const activeStudents = rest
          .pop()
          .map(studentSessionResponse =>
            studentSessionResponse.data.filter(
              student =>
                !student.status.includes('Dropped') &&
                !student.status.includes('Withdrawn') &&
                !student.status.includes('dropped')
            )
          )
          .map((classSession, ind) => ({
            name: sessions[ind].name,
            classSession
          }))
          .sort(
            (a, b) => +a.name.replace(/\D/g, '') - +b.name.replace(/\D/g, '')
          );
        /**
         * TODO: remove 'cohort' for production
         */
        if (process.env.NODE_ENV !== 'production') {
          activeStudents.push(cohort);
        }
        res.status(200).json(activeStudents);
      })
      .catch(console.log);
  },
  getOutliers(req, res) {
    // should cohort permissions be stored in our database instead?
    const allowedCohorts = req.session.devmtnUser.sessions.map(
      session => session.name
    );
    const db = req.app.get('db');
    const absencePromise = db.students.get_absence_outliers(allowedCohorts);
    const tardiesPromise = db.students.get_tardies_outliers(allowedCohorts);
    const projectPromise = db.students.get_project_outliers(allowedCohorts);
    const oneononePromise = db.students.get_oneonone_outliers(allowedCohorts);

    axios
      .all([absencePromise, tardiesPromise, projectPromise, oneononePromise])
      .then(([absences, tardies, projects, oneonones]) =>
        res.json({ absences, tardies, projects, oneonones })
      );
  }
};
