const express = require("express");

const controller = require("./../Controller/childController");
const {insertValidator,updateValidator,deleteValidator} = require("../Midelwares/validations/childValidator"); 
const validateResult = require("./../Midelwares/validations/validationResult");
const router = express.Router();

router
    .route('/child')
    .get(controller.getAllChild)
    .post(insertValidator,validateResult ,controller.insertChild)
    .put(updateValidator, validateResult,controller.updateChild)
    .delete(deleteValidator,validateResult,controller.deleteChild);

router.route('/child/update')
router 
    .route("/child/:id")
    .get(controller.getChildById)
    .put(updateValidator,validateResult, controller.updateChild)
    .delete(deleteValidator,validateResult,controller.deleteChild);


module.exports = router;

