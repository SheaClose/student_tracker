const cron = require('node-cron'),
  axios = require('axios'),
  configPath = process.env.NODE_ENV === 'production' ? 'prod' : 'dev',
  { authHeaders } = require(`../configs/${configPath}.config`);

module.exports = app => {
  /** Run at Midnight Saturday into Sunday */
  cron.schedule('* */8 * * *', async () => {
    const db = app.get('db');
    try {
      const users = await db.scripts.dm_users.getAllUsers();
      /** extract a list of the cohort sessions the mentor is over */
      const sessionPromises = users.map(async user => {
        try {
          const session = await axios.get(
            `https://devmountain.com/api/mentors/${user.user_id}/classsessions`,
            authHeaders
          );

          return session.data.map(
            ({ short_name, id, date_start, date_end }) => {
              /** While we have reference to user and cohort, create
               * a link to them both in the Db, if not exists.
               */
              db.scripts.user_cohort.link_user_cohort(user.user_id, id);
              /** Only need to save the name, id, start and end date from each cohort */
              return { short_name, id, date_start, date_end };
            }
          );
        } catch (e) {
          console.log(
            'Unable to get User Session info from DevMountain API: ',
            e
          );
          return e;
        }
      });
      const sessions = await Promise.all(sessionPromises);
      /** Since each mentor will have an array of cohorts, here we flatten
       * the array, remove duplicates, then attempt to add each cohort into
       *  the cohort table. These are restricted to unique values, so only
       *  new ones will be created, repeats will be rejected.
       */
      const newCohortPromises = await sessions
        .reduce((acc, cur) => [...acc, ...cur], [])
        .filter((c, i, a) => i === a.findIndex(cur => cur.id === c.id))
        .map(session =>
          db.scripts.cohorts.create_cohort([
            session.id,
            session.short_name,
            session.date_start,
            session.date_end
          ])
        );

      /** Once we are sure the cohorts are up to date we can get all
       * student information from the DevMountain API, confident that
       * the student info is current.
       */
      Promise.all(newCohortPromises)
        .then(() => {
          db
            .run('select * from cohorts')
            .then(cohorts => {
              cohorts.map(cohort =>
                /** This obtains the students list from each cohort */
                axios
                  .get(
                    `https://devmountain.com/api/classsession/enrollments/${
                      cohort.cohort_id
                    }`,
                    authHeaders
                  )
                  .then(enrollmentResponse =>
                    enrollmentResponse.data.filter(
                      student =>
                        !student.status.includes('Dropped') &&
                        !student.status.includes('Withdrawn') &&
                        !student.status.includes('dropped')
                    )
                  )
                  .then(students => {
                    students.map(student => {
                      const { first_name, last_name, email, dmId } = student;
                      return db.scripts.students
                        .create_new_student([
                          dmId,
                          first_name,
                          last_name,
                          email,
                          cohort.name
                        ])
                        .catch(() => console.log(student));
                    });
                  })
                  .catch(e => console.log('/////', e))
              );
            })
            .catch(console.log);
        })
        .catch(e => {
          console.log('Error updating Cohorts: ', e);
        });
    } catch (e) {
      console.log('Error getting users from DB: ', e);
    }
    console.log('Running Cronjob every hour');
  });
};
