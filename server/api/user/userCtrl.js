module.exports = {
  getUser(req, res) {
    res.status(200).json(req.user);
  },
  getUserRoles(req, res) {
    return res.status(200).json(req.user.roles);
  },
  isLoggedIn(req, res) {
    const userIsAuthed = verifyAuth(req.user);
    if (userIsAuthed) {
      return res.status(200).json(userIsAuthed);
    }
    return res.status(500).json(false);
  },
  updateDefaultCohort(req, res) {
    const db = req.app.get('db');
    db.scripts.dm_users
      .update_default_cohort([req.body.cohortName, req.user.user_id])
      .then(response => res.status(200).json(response[0].default_cohort_id))
      .catch(err => res.status(500).json(err));
  }
};

function verifyAuth(user) {
  return !user
    ? false
    : user.roles.filter(
      role =>
        role.role === 'admin' ||
          role.role === 'mentor' ||
          role.role === 'lead_instructor' ||
          role.role === 'lead_mentor'
    ).length > 0;
}
