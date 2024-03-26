const mongoose=require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);
const classSchema = new mongoose.Schema({
    _id:{type:Number},
    name:{type:String},
    supervisor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Teacher',
    },
    children:[{
        type:Number,
        ref:'Child'
    }]
});
classSchema.plugin(AutoIncrement, { id: 'class_counter' });

module.exports = mongoose.model("Class", classSchema );