module.exports = {
  getProjects(req, res) {
    const db = req.app.get('db');
    const { cohort_id } = req.params;
    db.projects
      .getProjectsByCohort({ cohort_id })
      .then(result => res.json(result));
    console.log(req.body, req.params);
  },
  saveCohortRepo(req, res) {
    console.log(req, res);
  },
  editCohortRepo(req, res) {
    console.log(req, res);
  },
  removeCohortRepo(req, res) {
    console.log(req, res);
  }
};
