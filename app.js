const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require("multer");
const path = require("path");
require('dotenv').config();

const teacherRoute = require('./Routes/teacherRouter'); 
const childRoute = require('./Routes/childRouter');
const classRoute = require('./Routes/classRouter');
const loginRoute = require("./Routes/authentication");

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,"images"));
    },
    filename:(req,file,cb)=>{
        cb(null,new Date().toLocaleDateString().replace(/\//g,"-")+"_"+file.originalname);
    }
})
const fileFilter=(req,file,cb)=>{
    if(file.mimetype=="image/jpeg"||
       file.mimetype=="image/jpg"||
       file.mimetype=="image/png")
       cb(null,true) 
    else
       cb(null,false)
}
const app = express();
const port=process.env.PORT;

mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("DB connected ....");
        app.listen(port,()=>{
            console.log(`I am listening ${port}`);
        });
    })
    .catch((error)=>{
        console.error("Error connecting to MongoDB:", error);
    });
    
app.use(express.json());
app.use("/images",express.static(path.join(__dirname,"images")));
app.use(multer({storage,fileFilter}).single("image"));
app.use(cors());
app.use(morgan('dev'));

app.use(loginRoute);
app.use(teacherRoute);
app.use(childRoute);
app.use(classRoute);

app.use((req,res)=>{
    res.status(404).json({data:"Not found"});
});

app.use((error,req,res,next)=>{
    res.status(500).json({data:` ${error}`});
})