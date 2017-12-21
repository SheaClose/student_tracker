module.exports = {
  getUser(req, res) {
    res.status(200).json(req.session.devmtnUser);
  },
  getUserRoles(req, res) {
    return res.status(200).json(req.session.devmtnUser.roles);
  },
  isLoggedIn(req, res) {
    if (req.session.devmtnUser) {
      const isLoggedIn =
        req.session.devmtnUser.roles.filter(
          role =>
            role.role === 'admin' ||
            role.role === 'mentor' ||
            role.role === 'lead_instructor' ||
            role.role === 'lead_mentor'
        ).length > 0;
      return res.status(200).json(isLoggedIn);
    }
    return res.status(500).json(false);
  }
};
