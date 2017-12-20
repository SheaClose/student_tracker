const axios = require('axios');
const { authHeader } = require('../../../configs/dev.config').devmtnAuth;

module.exports = {
  getstudents(req, res) {
    axios
      .get(
        `https://devmountain.com/api/mentors/${
          req.session.devmtnUser.id
        }/classsessions`,
        {
          headers: {
            authorization: authHeader
          }
        }
      )
      .then(resp => {
        axios
          .get(
            `https://devmountain.com/api/classsession/enrollments/${
              resp.data[resp.data.length - 1].id
            }`,
            {
              headers: {
                authorization: authHeader
              }
            }
          )
          .then(respo => {
            res.status(200).json(respo.data);
          });
      })
      .catch(console.log);
  }
};
