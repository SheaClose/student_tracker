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
    console.log(req.session.devmtnUser.sessions);
    const allowedCohorts = req.session.devmtnUser.sessions.map(
      session => session.name
    );
    const db = req.app.get('db');
    const absencePromise = db.students.get_absence_outliers(allowedCohorts);
    const tardiesPromise = db.students.get_tardies_outliers(allowedCohorts);
    const projectPromise = db.students.get_project_outliers(allowedCohorts);
    const oneononePromise = db.students.get_oneonone_outliers(allowedCohorts);

    Promise.all([
      absencePromise,
      tardiesPromise,
      projectPromise,
      oneononePromise
    ]).then(([absences, tardies, projects, oneonones]) => {
      const attendance = {};
      absences.forEach(row => {
        attendance[row.dm_id] = attendance[row.dm_id] || {
          name: `${row.first_name} ${row.last_name}`
        };
        attendance[row.dm_id].absences = attendance[row.dm_id].absences || [];
        attendance[row.dm_id].absences = [
          ...attendance[row.dm_id].absences,
          { date: row.date }
        ];
      });

      tardies.forEach(row => {
        attendance[row.dm_id] = attendance[row.dm_id] || {};
        attendance[row.dm_id].tardies = attendance[row.dm_id].tardies || [];
        attendance[row.dm_id].tardies = [
          ...attendance[row.dm_id].tardies,
          {
            date: row.date,
            minutes: row.minutes,
            timeframe: row.timeframe
          }
        ];
      });

      const att = Object.keys(attendance).reduce(
        (acc, cur) => [...acc, { ...attendance[cur], dm_id: cur }],
        []
      );
      // const attendance = absences.reduce((acc, row) => {
      //   const absenceArray = acc[row.dm_id] ? acc[row.dm_id].absences : [];
      //   acc[row.dm_id] = {
      //     name: `${row.first_name} ${row.last_name}`,
      //     absences: [...absenceArray, row.date]
      //   };
      //   return acc;
      // }, {});

      res.json({ att, projects, oneonones });
    });
  }
};
