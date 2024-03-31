const Teacher = require("./../Models/teacherSchema");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const saltRounds = 10;

exports.getAllTeachers = (req, res, next) => {
  Teacher.find({})
    .then((data) => {
      res.status(200).json({ data :" all teachers in system",data});
    })
    .catch((error) => next(error));
};
exports.getTeacherById = (req, res, next) => {
  Teacher.findOne({})
    .then((teacher) => {
      if (teacher == null) {
        return res.status(404).json({ error: "Teacher not found" });
      }
      res.status(200).json({ data:"Teacher is found",teacher });
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
        res.status(200).json({ data: "Teacher is added successfully", data });
      })
      .catch((error) => {
        next(error);
      });
  });
};
exports.updateTeacher = (req, res, next) => {
  let token = req.get("authorization");
    token = token.split(" ")[1];
    const decoded_token = jwt.verify(token, "os track");
    const { id } = decoded_token;
  Teacher.findByIdAndUpdate(id, {
    $set: {
      fullName: req.body.fullName,
      password: req.body.password,
      email: req.body.email,
      image: req.file.filename,
      supervisor: req.body.supervisor,
    },
  })
    .then((data) => {
      if (!data) {
        throw new Error("Teacher is not found");
      }
      res.status(200).json({ data: "Teacher is updated successfully" });
    })
    .catch((error) => next(error));
};

exports.deleteTeacher = (req, res, next) => {
  Teacher.findByIdAndDelete(req.body.id)
    .then((data) => {
      if (data == null) throw new Error("Teacher is not found ");
      res.status(200).json({ data: "Teacher is deleted successfully" });
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


exports.changePassword = async (req, res, next) => {
  try {
    let token = req.get("authorization");
    token = token.split(" ")[1];
    const decoded_token = jwt.verify(token, "os track");
    const { id } = decoded_token;
    
    const { oldPassword, newPassword } = req.body;

    const teacher = await Teacher.findById(id);
    if (!teacher) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    const isPasswordMatch = await bcrypt.compare(oldPassword, teacher.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Incorrect old password" });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await Teacher.findByIdAndUpdate(id, { password: hashedNewPassword });

    res.status(200).json({ message: "Password is changed successfully" });
  } catch (error) {
    next(error);
  }
};
