const projectDecompose = {
  decompose: {
    pk: 'dm_id',
    columns: [
      'first_name',
      'last_name',
      'dm_id',
      'cohort_id',
      'total_incomplete'
    ],
    projects: {
      pk: 'project_id',
      columns: ['name', 'due_date', 'github_link', 'completion', 'id'],
      array: true
    }
  }
};

module.exports = {
  getProjects(req, res) {
    const db = req.app.get('db');
    const { cohort_id } = req.params;
    db.projects
      .getProjectsByCohort({ cohort_id }, projectDecompose)
      .then(result => res.status(200).json(result));
  },
  updateCompletion(req, res) {
    const db = req.app.get('db');
    const { id } = req.params;
    const { completion, cohort_id } = req.body;
    console.log('cohort_id', cohort_id);

    db.projects
      .updateCompletion({ id, completion })
      .then(() =>
        db.projects.getProjectsByCohort({ cohort_id }, projectDecompose)
      )
      .then(result => {
        console.log(result);
        res.status(200).json(result);
      });
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
