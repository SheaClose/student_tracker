const { groupById, groupRowData, objToArray } = require('../utils/groupData');

module.exports = {
  getProjects(req, res) {
    const db = req.app.get('db');
    const { cohort_id } = req.params;
    db.projects.getProjectsByCohort({ cohort_id }).then(result => {
      const projects = {};
      groupById(result, projects, 'total_incomplete');
      groupRowData(result, projects, 'projects');

      // group by student

      res.status(200).json(objToArray(projects));
    });
  },
  updateCompletion(req, res) {
    const db = req.app.get('db');
    const { id } = req.params;
    const { completion, cohort_id } = req.body;

    db.projects
      .updateCompletion({ id, completion })
      .then(() => db.projects.getProjectsByCohort({ cohort_id }))
      .then(result => {
        const projects = {};
        groupById(result, projects, 'total_incomplete');
        groupRowData(result, projects, 'projects');

        // group by student

        res.status(200).json(objToArray(projects));
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
