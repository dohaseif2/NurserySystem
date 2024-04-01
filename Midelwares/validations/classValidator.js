const { body } = require("express-validator");

exports.insertValidator = [
    body("children").isArray().withMessage("Children should be array of child IDs"),
    body("children.*").isInt().withMessage("Each child ID should be integer")
];

exports.updateValidator = [
    body("id").isInt().withMessage("Teacher Id should be int"),
    body("name").optional().isString().withMessage("Class name should be string"),
    body("children").optional().isArray().withMessage("Children should be array of child IDs"),
    body("children.*").optional().isInt().withMessage("Each child ID should be integer")
];

exports.deleteValidator = [
    body("id").isInt().withMessage("Class Id should be int"),
];
