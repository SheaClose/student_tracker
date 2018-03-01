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
    db.scripts.projects
      .getProjectsByCohort({ cohort_id }, projectDecompose)
      .then(result => res.status(200).json(result))
      .catch(e => {
        console.log(`Error getting projects for ${cohort_id}`, e);
        res.status(500).json(e);
      });
  },
  updateCompletion(req, res) {
    const db = req.app.get('db');
    const { id } = req.params;
    const { completion, cohort_id } = req.body;

    /* Update the one project's completion, then send ALL the students'
    completion data to the front end because it's stored as a giant
    array instead of by each student individually. */
    db.scripts.projects
      .updateCompletion({ id, completion })
      .then(() =>
        db.scripts.projects
          .getProjectsByCohort({ cohort_id }, projectDecompose)
          .catch(e => console.log('Error getting projects after update', e))
      )
      .then(result => res.status(200).json(result))
      .catch(e => {
        res.status(500).json(e);
        console.log('Error updating completion', e);
      });
  }
};
