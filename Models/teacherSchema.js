const mongoose = require("mongoose");
// const AutoIncrement = require('mongoose-sequence')(mongoose);

const teacherSchema = new mongoose.Schema({
    fullName: { type: String },
    password: { type: String },
    email: { type: String },
    image: { type: String },
    supervisor: { type: Boolean },
    role: { type: String }
});

// teacherSchema.plugin(AutoIncrement, { id: 'teacher_counter' });
module.exports = mongoose.model('Teacher', teacherSchema);
