const { groupById, groupRowData, objToArray } = require('../utils/groupData');

const configPath = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
const { authHeaders } = require(`../../../configs/${configPath}.config`);
const axios = require('axios');

/**
 * This is purely for development. Provides a dummy session for mentors who've
 * only mentored once (to see what it would look like with multiple cohorts.)
 */
const cohort = require('../../../configs/cohort');

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
    const { devmtnUser } = req.session;
    if (devmtnUser) {
      const { sessions, id } = devmtnUser;
      const cohortPromises = asyncGetCohorts(sessions, id);
      const sessionPromisesArray = sessions.map(session =>
        axios.get(
          `https://devmountain.com/api/classsession/enrollments/${session.id}`,
          authHeaders
        )
      );
      const sessionPromises = Promise.all(sessionPromisesArray);
      /**
       * since we are potentially getting multiple sessions, we await all responses
       * before sending back to the front end.
       */
      return axios
        .all([sessionPromises, cohortPromises])
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
              .map((classSession, ind) => {
                const inSession =
                  new Date(cohortResponse[ind].date_start).getTime() <
                    Date.now() &&
                  new Date(cohortResponse[ind].date_end).getTime() > Date.now();
                return Object.assign(
                  {
                    name: sessions[ind].name,
                    classSession,
                    inSession
                  },
                  cohortResponse[ind]
                );
              })
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
  async getOutliers(req, res) {
    const { devmtnUser } = req.session;
    if (devmtnUser) {
      let allowedCohorts = devmtnUser.sessions.map(session => session.name);
      if (process.env.NOD_ENV !== 'production') {
        allowedCohorts = [...allowedCohorts, 'WDL99', 'WDL6', 'WDL7'];
        console.log(allowedCohorts);
      }
      const db = req.app.get('db');
      try {
        const absencesData = await db.students.get_absence_outliers({
          allowedCohorts
        });
        const tardiesData = await db.students.get_tardies_outliers({
          allowedCohorts
        });
        const projectsData = await db.students.get_project_outliers({
          allowedCohorts
        });
        const oneononesData = await db.students.get_oneonone_outliers({
          allowedCohorts
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

        return res.json({
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
    db.students.get_oneonones(cohort).then(response => res.json(response));
  },
  addOneOnOne(req, res) {
    const db = req.app.get('db');
    console.log(req.body);
    db.students.add_oneonone(req.body).then(() => {
      db.students
        .get_oneonones(req.body.cohort)
        .then(response => res.json(response));
    });
  }
};

async function asyncGetCohorts(sessions, id) {
  try {
    return await axios
      .get(
        `https://devmountain.com/api/mentors/${id}/classsessions`,
        authHeaders
      )
      .then(dmCohortData =>
        dmCohortData.data
          .map((c, i) => {
            const { date_start, date_end } = c;
            return Object.assign({}, sessions[i], {
              date_start,
              date_end
            });
          })
          .sort(
            (a, b) => +a.name.replace(/\D/g, '') - +b.name.replace(/\D/g, '')
          )
      )
      .catch(console.log);
  } catch (e) {
    return e;
  }
}
