const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const addressSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  building: {
    type: String,
    required: true,
  },
});

const childSchema = new mongoose.Schema({
  _id: { type: Number  },
  fullName: { type: String , required: true },
  age: { type: Number , required: true},
  level: { type: String, enum: ["PreKG", "KG1", "KG2"] , required: true},
  address: {
    type: addressSchema,
    required: true
  },
  image: { type: String },

});

childSchema.plugin(AutoIncrement, { id: 'child_counter' });
module.exports = mongoose.model("Child", childSchema);

