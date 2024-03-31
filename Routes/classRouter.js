const express = require("express");

const controller = require("./../Controller/classController");
const {insertValidator,updateValidator,deleteValidator} = require("../Midelwares/validations/classValidator"); 
const validateResult = require("./../Midelwares/validations/validationResult");
const { isAuth, isAdmin } = require("./../Midelwares/authMW");

const router = express.Router();

router.get("/class/teacher/:id",isAuth, controller.getClassTeacher);
router.get("/class/child/:id",isAuth, controller.getClassChildernInfo);

router
    .route('/class')
    .get(isAuth,controller.getAllClass)
    .post(isAdmin,insertValidator,validateResult, controller.insertClass)
    .put(isAdmin,updateValidator,validateResult, controller.updateClass)
    .delete(isAdmin,deleteValidator,validateResult,controller.deleteClass);


router 
    .route("/class/:id")
    .get(isAdmin,controller.getClassById)


module.exports = router;

