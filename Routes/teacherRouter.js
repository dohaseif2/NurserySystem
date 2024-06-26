const express = require("express");
const controller = require("./../Controller/teacherController");
const {insertValidator,updateValidator,deleteValidator} = require("../Midelwares/validations/teacherValidator");
const validateResult = require("./../Midelwares/validations/validationResult");
const { isAuth, isAdmin ,isTeacher } = require("./../Midelwares/authMW");
const {changePasswordValidator}=require("./../Midelwares/validations/passwordValidator");
const router = express.Router();

router.get("/teachers/supervisors",isAuth, controller.getAllSupervisors);

router.patch("/teachers/changePassword", isTeacher , changePasswordValidator, validateResult, controller.changePassword);

router
    .route("/teachers")
    .get(isAuth,controller.getAllTeachers)
    .post(insertValidator,validateResult, controller.insertTeacher)
    .put(isTeacher,updateValidator,validateResult,controller.updateTeacher)
    .delete(isAdmin,deleteValidator,validateResult,controller.deleteTeacher)

router 
    .route("/teachers/:id")
    .get(isAdmin,controller.getTeacherById)
    
    module.exports = router;
