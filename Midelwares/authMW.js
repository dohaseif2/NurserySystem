const jwt = require("jsonwebtoken");

module.exports.isAuth = (req, res, next) => {
  try {
    let token = req.get("authorization");
    if (!token) {
      throw new Error("Token not provided");
    }
    token = token.split(" ")[1];
    let decoded_token = jwt.verify(token, "os track");
    req.token = decoded_token;
    next();
  } catch (error) {
    error.message = "Not authenticated";
    error.status = 403;
    next(error);
  }
};
module.exports.isAdmin = (req, res, next) => {
  try {
    let token = req.get("authorization");
    if (!token) {
      throw new Error("Token not provided");
    }
    token = token.split(" ")[1];
    const decoded_token = jwt.verify(token, "os track");

    if (!decoded_token || decoded_token.role !== "admin") {
      console.log("isAdmin Middleware - Not authorized");
      throw new Error("Not authorized");
    }

    console.log("isAdmin Middleware - Authorized");
    next();
  } catch (error) {
    error.message = "Not authenticated";
    error.status = 403;
    next(error);
  }
};
module.exports.isTeacher = (req, res, next) => {
  try {
    let token = req.get("authorization");
    if (!token) {
      throw new Error("Token not provided");
    }
    token = token.split(" ")[1];
    const decoded_token = jwt.verify(token, "os track");

    if (!decoded_token || decoded_token.role !== "teacher") {
      console.log("isAdmin Middleware - Not authorized");
      throw new Error("Not authorized");
    }

    console.log("isAdmin Middleware - Authorized");
    next();
  } catch (error) {
    error.message = "Not authenticated";
    error.status = 403;
    next(error);
  }
};

// module.exports.isTeacher = (req, res, next) => {
//   console.log("isTeacher Middleware - req.token:", req.token);
//   if (!req.token || req.token.role !== "teacher") {
//     console.log("isTeacher Middleware - Not authorized");
//     return next(new Error("Not authorized"));
//   }
//   console.log("isTeacher Middleware - Authorized");
//   next();
// };
