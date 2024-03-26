const express = require("express");
const controller = require("./../Controller/teacherController");
const {insertValidator,updateValidator,deleteValidator} = require("../Midelwares/validations/teacherValidator");
const validateResult = require("./../Midelwares/validations/validationResult");
const { isAuth } = require("./../Midelwares/authMW");

const router = express.Router();

    router.get("/teachers/supervisors", controller.getAllSupervisors);


router
    .route("/teachers")
    .get(isAuth,controller.getAllTeachers)
    .post(insertValidator,validateResult, controller.insertTeacher)
    .put(updateValidator,controller.updateTeacher)
    .delete(deleteValidator,controller.deleteTeacher)
router 
    .route("/teachers/:id")
    .get(controller.getTeacherById)
    .put(updateValidator, controller.updateTeacher)
    .delete(deleteValidator,controller.deleteTeacher);

    
    module.exports = router;
