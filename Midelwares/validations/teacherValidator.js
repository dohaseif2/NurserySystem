const { body, param, query } = require("express-validator");

const Teacher = require('./../../Models/teacherSchema'); 

exports.insertValidator = [
  body("fullName").isAlpha().withMessage("teacher username should be string").isLength({min : 4 }).withMessage("UserName should be > 4"),
  body("password").isLength({min:6}).withMessage('password should be >6'),
  body("email").isEmail().withMessage("Invalid email address").custom(async (value) => {
    const user = await Teacher.findOne({ email: value });
    if (user) {
      throw new Error('Email already exists');
    }
    return true;
  }),
  body("supervisor").isBoolean().withMessage("Supervisor should be a boolean value (true/false)"),
  body("role").isIn(["admin", "teacher"]).withMessage("Role should be either (admin/teacher)")
];

exports.updateValidator = [
    body("id").isMongoId().withMessage("Teacher Id should be ObjectId"),
    body("fullName").optional().isAlpha().withMessage("teacher username should be string").isLength({min : 4 }).withMessage("UserName should be > 4"),
    body("password").optional().isLength({min:6}).withMessage('password should be >6'),
    body("email").isEmail().withMessage("Invalid email address"),
    body("supervisor").isBoolean().withMessage("Supervisor should be a boolean value (true/false)"),
    body("role").isIn(["admin", "teacher"]).withMessage("Role should be either (admin/teacher)")
];
exports.deleteValidator=[
    body("id").isMongoId().withMessage("Teacher Id should be ObjectId"),
]