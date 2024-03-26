const TeacherSchema = require("./../Models/teacherSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.login = (req, res, next) => {
  const { fullName, password } = req.body;

  TeacherSchema.findOne({ fullName })
    .then((teacher) => {
      if (!teacher) {
        throw new Error("Username or password incorrect");
      }
      
      bcrypt.compare(password, teacher.password, (err, result) => {
        if (err || !result) {
          throw new Error("Username or password incorrect");
        }

        const token = jwt.sign(
          {
            fullName: teacher.fullName,
            role: teacher.role,
          },
          process.env.SECRET_KEY,
          { expiresIn: "1hr" }
        );

        res.json({ teacher, token });
      });
    })
    .catch((error) => next(error));
};
