const Child= require("./../Models/childSchema");

exports.getAllChild = (req, res, next) => {
  Child.find({})
  .then(data=>{
    res.status(200).json(data);
  })
  .catch(error=>{
    next(error);
  })
};
exports.getChildById = (req, res, next) => {
  Child.findById(req.params.id)
    .then(child => {
      if (!child) {
        return res.status(404).json({ error: "Child not found" });
      }
      res.status(200).json({ data: child });
    })
    .catch(error => {
      next(error);
    });
};

exports.insertChild = (req, res, next) => {
  Child.countDocuments()
    .then(count => {
      const newId = count + 1;
      const newChild = new Child({
        _id: newId,
        fullName: req.body.fullName,
        age: req.body.age,
        level: req.body.level,
        image: req.file.filename,
        address: {
          city: req.body.address.city,
          street: req.body.address.street,
          building: req.body.address.building
        }
      });
      return newChild.save();
    })
    .then(savedChild => {
      res.status(200).json({ data: "added", savedChild });
    })
    .catch(error => {
      next(error);
    });
};

exports.updateChild = (req, res, next) => {
  Child.findByIdAndUpdate(req.body.id,{
    $set:{
    fullName:req.body.fullName,
    age:req.body.age,
    level:req.body.level,
    // address: {
    //   city: req.body.address.city,
    //   street: req.body.address.street,
    //   building: req.body.address.building
    // }  
    }
  })
  .then(data=>{
    if(data==null){
      throw new Error("Child is not found") 
    }
    res.status(200).json({ data: "updated", data});
  })
  .catch(error=>next(error))
};
exports.deleteChild = (req, res, next) => {
  Child.findByIdAndDelete(req.body.id)
  .then(data=>{
    if(data==null) throw new Error("child is not found ");
    res.status(200).json({ data: "deleted" });

  })
  .catch(error=>next(error))

};
