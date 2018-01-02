const configPath = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
const { github_token } = require(`../../../configs/${configPath}.config`);
const axios = require('axios');

module.exports = {
  getRepos(req, res) {
    const repo_count = req.app.get('dm_repo_count');
    const promises = [];
    for (let i = 1; i <= Math.ceil(repo_count / 100); i++) {
      promises.push(
        axios.get(
          `https://api.github.com/orgs/DevMountain/repos?page=${i}&per_page=100&access_token=${github_token}`
        )
      );
    }
    axios
      .all(promises)
      .then(response => {
        res
          .status(200)
          .json(response.reduce((acc, resObj) => [...acc, ...resObj.data], []));
      })
      .catch(err => console.log(`Error getting Public Repos: ${err}`));
  }
};
