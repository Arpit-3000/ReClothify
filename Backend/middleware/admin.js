const admin = (req, res, next) => {
    if (!req.user || !req.user.isAdmin) {
      return res.status(403).json({ message: 'Admin resource. Access denied.' });
    }
    next();
  };
  
  module.exports = admin;