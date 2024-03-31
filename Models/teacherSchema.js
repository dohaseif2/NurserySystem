const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    fullName: { type: String },
    password: { type: String },
    email: { type: String, unique: true },
    image: { type: String },
    supervisor: { type: Boolean },
    role: { type: String }
});

module.exports = mongoose.model('Teacher', teacherSchema);
