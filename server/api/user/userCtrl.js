module.exports = {
  authMiddleware(req, res, next) {
    const isLoggedIn = verifyAuth(req.session.devmtnUser);
    if (isLoggedIn) return next();
    return res.redirect('/auth/devmtn');
  },
  getUser(req, res) {
    res.status(200).json(req.session.devmtnUser);
  },
  getUserRoles(req, res) {
    return res.status(200).json(req.session.devmtnUser.roles);
  },
  isLoggedIn(req, res) {
    const isLoggedIn = verifyAuth(req.session.devmtnUser);
    if (isLoggedIn) {
      return res.status(200).json(isLoggedIn);
    }
    return res.status(500).json(false);
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
