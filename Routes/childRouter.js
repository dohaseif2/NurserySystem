const express = require("express");

const controller = require("./../Controller/childController");
const {insertValidator,updateValidator,deleteValidator} = require("../Midelwares/validations/childValidator"); 
const validateResult = require("./../Midelwares/validations/validationResult");
const { isAuth, isAdmin ,isTeacher } = require("./../Midelwares/authMW");
const router = express.Router();

router
    .route('/child')
    .get(isAuth,controller.getAllChild)
    .post(insertValidator,validateResult ,controller.insertChild)
    .put(isAdmin,updateValidator, validateResult,controller.updateChild)
    .delete(isAdmin,deleteValidator,validateResult,controller.deleteChild);

router 
    .route("/child/:id")
    .get(isAdmin,controller.getChildById)
    .put(isAdmin,updateValidator,validateResult, controller.updateChild)
    .delete(isAdmin,deleteValidator,validateResult,controller.deleteChild);

module.exports = router;

