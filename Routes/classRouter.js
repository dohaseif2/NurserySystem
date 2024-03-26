const express = require("express");

const controller = require("./../Controller/classController");
const {insertValidator,updateValidator,deleteValidator} = require("../Midelwares/validations/classValidator"); 
const validateResult = require("./../Midelwares/validations/validationResult");

const router = express.Router();

router.get("/class/teacher/:id", controller.getClassTeacher);
router.get("/class/child/:id", controller.getClassChildernInfo);

router
    .route('/class')
    .get(controller.getAllClass)
    .post(insertValidator,validateResult, controller.insertClass)
    .put(updateValidator,validateResult, controller.updateClass)
    .delete(deleteValidator,validateResult,controller.deleteClass);


router 
    .route("/class/:id")
    .get(controller.getClassById)
    .put(updateValidator,validateResult, controller.updateClass)
    .delete(deleteValidator,validateResult,controller.deleteClass);


module.exports = router;

