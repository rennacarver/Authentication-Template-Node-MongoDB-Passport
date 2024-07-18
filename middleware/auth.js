module.exports = {
    requireAuth: (req, res, next) => {
      if (req.isAuthenticated()) {
        return next();
      }
      res.redirect('/')
    },
  };