function isAdmin(req, res, next) {
  if (req.user.role === "ADMIN") {
    next();
  } else {
    res.redirect("http://localhost:8080/")
  }
}

export default isAdmin;
