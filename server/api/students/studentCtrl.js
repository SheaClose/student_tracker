const axios = require('axios');
const { authHeaders } = require('../../../configs/dev.config');

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
          }));
        res.status(200).json(activeStudents);
      })
      .catch(console.log);
  }
};
