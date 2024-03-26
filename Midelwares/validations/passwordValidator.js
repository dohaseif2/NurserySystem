const { body, param, query} = require("express-validator");

exports.changePasswordValidator = [
  body("oldPassword").isLength({min:6}).withMessage('password should be >6'),
  body("newPassword").isLength({min:6}).withMessage('password should be >6'),
];