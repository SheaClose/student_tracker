const axios = require('axios');
const { github_token } = require('../../../configs/dev.config');

module.exports = {
  getRepos(req, res) {
    let repo_count;
    axios
      .get(
        `https://api.github.com/orgs/DevMountain?access_token=${github_token}`
      )
      .then(resp => {
        repo_count = resp.data.public_repos;
        const promises = [];
        for (let i = 1; i <= Math.ceil(repo_count / 100); i++) {
          promises.push(
            axios.get(
              `https://api.github.com/orgs/DevMountain/repos?page=${i}&per_page=100&access_token=${github_token}`
              // , { headers: { Authorization: `token ${github_token}` } }
            )
          );
        }
        axios
          .all(promises)
          .then(response =>
            res
              .status(200)
              .json(
                response.reduce((acc, resObj) => [...acc, ...resObj.data], [])
              )
          )
          .catch(err => console.log(`Error getting Public Repos: ${err}`));
      })
      .catch(err =>
        console.log(
          `Error getting DevMountain organizational information: ${err}`
        )
      );
  }
};
