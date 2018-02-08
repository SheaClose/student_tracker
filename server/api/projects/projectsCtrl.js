const { groupById, groupRowData, objToArray } = require('../utils/groupData');

module.exports = {
  getProjects(req, res) {
    const db = req.app.get('db');
    const { cohort_id } = req.params;
    db.projects.getProjectsByCohort({ cohort_id }).then(result => {
      const projects = {};
      groupById(result, projects, 'total_incomplete');
      groupRowData(result, projects, 'projects');
      objToArray(projects);
      // group by student

      res.json(objToArray(projects));
    });
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
