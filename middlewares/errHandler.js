const errHandler = (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
      res.status(403).json({ message: err.errors[0].message });
      break;
    case "NotFound":
    case "ErrorGeneratePractice":
      res.status(403).json({ message: err.message });
      break;
    default:
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
      break;
  }
};

module.exports = errHandler;
