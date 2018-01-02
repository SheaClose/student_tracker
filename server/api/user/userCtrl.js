const configPath = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
const { auth_redirect } = require(`../../../configs/${configPath}.config`);
module.exports = {
  authMiddleware(req, res, next) {
    if (req.session.devmtnUser) {
      const isLoggedIn =
        req.session.devmtnUser.roles.filter(
          role =>
            role.role === 'admin' ||
            role.role === 'mentor' ||
            role.role === 'lead_instructor' ||
            role.role === 'lead_mentor'
        ).length > 0;
      if (isLoggedIn) return next();
    }
    return res.redirect(`${auth_redirect}auth/devmtn`);
  },
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
