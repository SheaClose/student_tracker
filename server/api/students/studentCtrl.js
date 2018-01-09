const configPath = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
const { authHeaders } = require(`../../../configs/${configPath}.config`);
const axios = require('axios');

/**
 * This is purely for development. Provides a dummy session for mentors who've
 * only mentored once (to see what it would look like with multiple cohorts.)
 */
const cohort = require('../../../configs/cohort');

module.exports = {
  getstudents(req, res) {
    const { devmtnUser } = req.session;
    if (devmtnUser) {
      const { sessions, id } = devmtnUser;
      const cohortPromises = asyncGetCohorts(sessions, id);
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
      return axios
        .all([Promise.all(sessionPromises), cohortPromises])
        .then(
          axios.spread((sessionResponse, cohortResponse) => {
            /**
             * remove dropped/withdrawn students before returning
             */
            const activeStudents = sessionResponse
              .map(studentSessionResponse =>
                studentSessionResponse.data.filter(
                  student =>
                    !student.status.includes('Dropped') &&
                    !student.status.includes('Withdrawn') &&
                    !student.status.includes('dropped')
                )
              )
              .map((classSession, ind) =>
                /** creating merged objects from sessionPromise and cohortPromise. Mapping them
                 * together, ex:
                 *  {
                 *    id: 81
                 *    name: "WDL4",
                 *    classSession: [{...student info}, {...student info}, {...student info}],
                 *    date_start: '2016-08-03T04:00:00.000Z',
                 *    date_end: '2016-11-29T04:00:00.000Z' },
                 *  }
                 * */
                Object.assign(
                  {
                    name: sessions[ind].name,
                    classSession
                  },
                  cohortResponse[ind]
                )
              )
              .sort(
                (a, b) =>
                  +a.name.replace(/\D/g, '') - +b.name.replace(/\D/g, '')
              );
            /** adding dummy data for development */
            if (process.env.NODE_ENV !== 'production') {
              activeStudents.push(cohort);
            }
            return res.status(200).json(activeStudents);
          })
        )
        .catch(console.log);
    }
    return res.status(500).json('User not logged in');
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

      res.json({ att, projects, oneonones });
    });
  }
};

function asyncGetCohorts(sessions, id) {
  return axios
    .get(`https://devmountain.com/api/mentors/${id}/classsessions`, authHeaders)
    .then(dmCohortData =>
      dmCohortData.data
        .map((c, i) => {
          const { date_start, date_end } = c;
          return Object.assign({}, sessions[i], {
            date_start,
            date_end
          });
        })
        .sort((a, b) => +a.name.replace(/\D/g, '') - +b.name.replace(/\D/g, ''))
    );
}
