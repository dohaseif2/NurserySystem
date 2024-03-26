const { body, param, query } = require("express-validator");
exports.insertValidator = [
  body("fullName").isAlpha().withMessage("teacher username should be string").isLength({min : 4 }).withMessage("UserName should be > 4"),
  body("password").isLength({min:6}).withMessage('password should be >6'),
  body("email").isEmail().withMessage("Invalid email address"),
  body("supervisor").isBoolean().withMessage("Supervisor should be a boolean value (true/false)")

];

exports.updateValidator = [
    body("id").isMongoId().withMessage("Teacher Id should be ObjectId"),
    body("fullName").optional().isAlpha().withMessage("teacher username should be string").isLength({min : 4 }).withMessage("UserName should be > 4"),
    body("password").optional().isLength({min:6}).withMessage('password should be >6'),
    body("email").isEmail().withMessage("Invalid email address"),
    body("supervisor").isBoolean().withMessage("Supervisor should be a boolean value (true/false)")

];
exports.deleteValidator=[
    body("id").isMongoId().withMessage("Teacher Id should be ObjectId"),
]