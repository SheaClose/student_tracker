module.exports = {
  getRepos(req, res) {
    req.app
      .get('db')
      .run('select * from repos')
      .then(resp => res.status(200).json(resp))
      .catch(err => res.status(500).json(err));
  }
};
