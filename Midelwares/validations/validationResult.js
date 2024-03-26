const {validationResult }= require("express-validator");
module.exports = (req, res, next) => {
    let result = validationResult(req);
    if (!result.isEmpty()) {  
        let errorMsg = result.array().map(error => error.msg).join(", ");
        let error = new Error(errorMsg);
        error.status = 422;
        next(error);
    } else {
        next();
    }
};
