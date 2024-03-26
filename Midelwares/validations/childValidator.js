const { body, param, query } = require("express-validator");
exports.insertValidator = [
    exports.insertValidator = [
        body("fullName").isString().withMessage("Child name should be a string").isLength({min : 4 }).withMessage("Full name should be > 4 characters"),
        body("age").isInt().withMessage("Child age should be int"),
        body("level").isIn(['PreKG', 'KG1', 'KG2']).withMessage("Invalid level value"),
        body("address.city").isString().withMessage("City must be a string"),
        body("address.street").isString().withMessage("Street must be a string"),
        body("address.building").isString().withMessage("Building must be a string")
    ]      
];


exports.updateValidator = [
        body("id").isInt().withMessage("Child Id should be int"),
        body("fullName").optional().isString().withMessage("Child name should be a string").isLength({min : 4 }).withMessage("Full name should be > 4 characters"),
        body("age").isInt().optional().withMessage("Child age should be int"),
        body("level").optional().isIn(['PreKG', 'KG1', 'KG2']).withMessage("Invalid level value"),
        body("address.city").optional().isString().withMessage("City must be a string"),
        body("address.street").optional().isString().withMessage("Street must be a string"),
        body("address.building").optional().isString().withMessage("Building must be a string")
];
exports.deleteValidator=[
    body("id").isInt().withMessage("Child Id should be int"),
]