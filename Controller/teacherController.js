const Teacher = require("./../Models/teacherSchema");
const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.getAllTeachers = (req, res, next) => {
  Teacher.find({})
    .then((data) => {
      res.status(200).json({ data });
    })
    .catch((error) => next(error));
};
exports.getTeacherById = (req, res, next) => {
  Teacher.findOne({})
    .then((teacher) => {
      if (teacher == null) {
        return res.status(404).json({ error: "teacher not found" });
      }
      res.status(200).json({ teacher });
    })
    .catch((error) => next(error));
};
exports.insertTeacher = (req, res, next) => {
  const { fullName, password, email, supervisor, role } = req.body;

  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    if (err) {
      return next(err);
    }

    const teacher = new Teacher({
      fullName,
      password: hashedPassword,
      email,
      image: req.file.filename,
      supervisor,
      role
    });

    teacher.save()
      .then((data) => {
        res.status(200).json({ data: "Teacher added successfully", data });
      })
      .catch((error) => {
        next(error);
      });
  });
};
exports.updateTeacher = (req, res, next) => {
  Teacher.findByIdAndUpdate(req.body.id, {
    $set: {
      fullName: req.body.fullName,
      password: req.body.password,
      email: req.body.email,
      image: req.body.image,
      supervisor: req.body.supervisor,
    },
  })
    .then((data) => {
      if (!data) {
        throw new Error("Teacher is not found");
      }
      res.status(200).json({ data: "Updated" });
    })
    .catch((error) => next(error));
};

exports.deleteTeacher = (req, res, next) => {
  Teacher.findByIdAndDelete(req.body.id)
    .then((data) => {
      if (data == null) throw new Error("Teacher is not found ");
      res.status(200).json({ data: "deleted" });
    })
    .catch((error) => next(error));

  res.status(200).json({ data: "deleted" });
};

exports.getAllSupervisors = (req, res, next) => {
  Teacher.find({ supervisor: true })
    .then(supervisors => {
      res.status(200).json({ data: supervisors });
    })
    .catch(error => {
      next(error);
    });
};