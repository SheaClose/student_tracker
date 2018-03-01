/* massive accepts a decompose object that converts the
  array of results into an array of objects with a defined schema */
const projectsDecompose = {
  decompose: {
    pk: 'dm_id',
    columns: ['first_name', 'last_name', 'total_incomplete', 'dm_id'],
    projects: {
      pk: 'id',
      columns: ['name', 'due_date', 'completion', 'id'],
      array: true
    }
  }
};
const oneononesDecompose = {
  decompose: {
    pk: 'dm_id',
    columns: ['first_name', 'last_name', 'dm_id'],
    oneonones: {
      pk: 'id',
      columns: [
        'id',
        'notes',
        'attitude',
        'skill',
        'confidence_skill',
        'confidence_personal',
        'defer_drop_concern',
        'worried',
        'personal_project_ability',
        'date',
        'user_id'
      ],
      array: true
    }
  }
};

const tardiesDecompose = {
  decompose: {
    pk: 'dm_id',
    columns: ['first_name', 'last_name', 'count', 'total'],
    details: {
      pk: 'id',
      columns: ['date', 'morning', 'break', 'lunch', 'afternoon'],
      array: true
    }
  }
};

module.exports = {
  getstudents(req, res) {
    const db = req.app.get('db');
    db.scripts.students
      .get_students(req.query.cohort)
      .then(students => res.json(students))
      .catch(err => console.log('Error getting students', err));
  },
  async getOutliers(req, res) {
    if (req.user) {
      const { cohorts } = req.user;

      const db = req.app.get('db');
      try {
        /* db scripts are in scripts directory so we don't have
        namespace collisions between script folders and table names */

        /* TODO: attendance outliers doesn't currently work. It sends this
        blank data so the front end doesn't go crazy
        const absencesData = await db.scripts.outliers.get_absence_outliers({
          cohorts
        }); */

        const tardiesData = await db.scripts.outliers.get_tardies_outliers({
          cohorts,
          tardiesDecompose
        });

        const projects = await db.scripts.outliers.get_project_outliers(
          { cohorts },
          projectsDecompose
        );
        const oneonones = await db.scripts.outliers.get_oneonone_outliers(
          { cohorts },
          oneononesDecompose
        );

        /* TODO: attendance outliers doesn't currently work. It sends this
        blank data so the front end doesn't go crazy */
        const attendance = [[], tardiesData];

        return res.status(200).json({
          attendance,
          projects,
          oneonones
        });
      } catch (e) {
        console.log(e);
        return res.status(500).json('Error getting outlier information');
      }
    }
    return res.status(500).json('User not logged in');
  },
  dropStudent(req, res) {
    const { id } = req.params;
    const db = req.app.get('db');
    db.scripts.students
      .drop_student(id)
      .then(resp => {
        if (resp.length) {
          return res.status(200).json(id);
        }
        return res.status(204).json(id);
      })
      .catch(console.log);
  },
  getOneOnOnes(req, res) {
    const db = req.app.get('db');
    const { cohort } = req.query;
    db.scripts.students
      .get_oneonones(cohort)
      .then(response => {
        res.status(200).json(response);
      })
      .catch(e => {
        console.log(`Error getting one on ones for ${cohort}`, e);
        res.status(500).json(e);
      });
  },
  addOneOnOne(req, res) {
    const db = req.app.get('db');
    db.scripts.students
      .add_oneonone(req.body)
      .then(() => {
        db.scripts.students
          .get_oneonones(req.body.cohort)
          .then(response => res.status(200).json(response))
          .catch(e => console.log('Error getting one on ones after update', e));
      })
      .catch(e => {
        console.log('Error adding one on one', e);
        res.status(500).json(e);
      });
  },
  async getStudentDetails(req, res) {
    const db = req.app.get('db');
    const { dm_id } = req.params;
    try {
      /* massive accepts an options object.
      { single: true } extracts the one result from the array  */
      const info = await db.scripts.students.get_student_info(
        { dm_id },
        { single: true }
      );
      const attendance = await db.scripts.students.get_student_attendance({
        dm_id
      });
      const projects = await db.scripts.students.get_student_projects({
        dm_id
      });
      const oneonones = await db.scripts.students.get_student_oneonones({
        dm_id
      });

      const student = { ...info, attendance, projects, oneonones };
      res.json(student);
    } catch (e) {
      console.log(`Error getting student details for ${dm_id}`, e);
      res.status(500).json(e);
    }
  }
};
