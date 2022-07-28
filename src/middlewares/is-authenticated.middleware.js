function isAuthenticated(req, res, next) {
  if (req.cookies.username) {
    return next();
  }
  res.redirect('/auth/sign-up');
}

export default isAuthenticated;