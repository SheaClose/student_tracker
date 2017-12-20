module.exports = {
  getMentor(req, res) {
    res.send({ session: req.session.devmtnUser });
  },
  getMentorRoles(req, res) {
    return res.status(200).json(req.session.devmtnUser.roles);
  }
};
