const Class = require("./../Models/classSchema");
const Child = require("../Models/childSchema");

exports.getAllClass = (req, res, next) => {
    Class.find({}).populate({path:"supervisor"}).populate({path:"children"})
    .then(data=>{
        res.status(200).json({  data:" all classes in system",data});
    })
    .catch((error)=>next(error));
};
exports.getClassById = (req, res, next) => {
    Class.findOne({})
    .then(data=>{
        if (data == null) {
            return res.status(404).json({ error: "class not found" });
          }
        res.status(200).json({ data:"class is found",data});
    })
    .catch((error)=>next(error));
};
exports.insertClass = (req, res, next) => {
    console.log(req.body);
    
    let object = new Class({
        name: req.body.name,
        supervisor: req.body.supervisor,
        children: req.body.children,
    });
    
    object.save()
        .then(data => {
            res.status(200).json({ data , message: "Class added successfully"});
        })
        .catch(error => {
            next(error);
        });
};


exports.updateClass = (req, res, next) => {
    Class.findByIdAndUpdate(req.body.id, {
        $set: {
            name:req.body.name,
            supervisor:req.body.supervisor,
            children:req.body.children,
        },
      })
        .then((data) => {
          if (!data) {
            throw new Error("Class is not found");
          }
          res.status(200).json({ data: "Class is updated successfully" });
        })
        .catch((error) => next(error));
};

exports.deleteClass = (req, res, next) => {
    Class.findByIdAndDelete(req.body.id)
    .then((data) => {
      if (data == null) throw new Error("Class is not found ");
      res.status(200).json({ data: "Class is deleted successfully" });
    })
    .catch((error) => next(error));

  res.status(200).json({ data: "Class is deleted successfully" });
};



exports.getClassChildernInfo =  (req, res, next) => {
    const classId = req.params.id;

    Class.findById(classId)
        .populate('children')
        .then(data => {
            if (!data) {
                throw new Error("Class is not found");
            }
            res.json({ children : data.children });
        })
        .catch((error) => next(error));

};

exports.getClassTeacher = (req, res, next) => {
    const classId = req.params.id;

    Class.findById(classId)
        .populate('supervisor')
        .then(data => {
            if (!data) {
                throw new Error("Class is not found");
            }
            res.json({ supervisor: data.supervisor });
        })
        .catch((error) => next(error));

};