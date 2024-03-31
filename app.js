/********modules */
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require("multer");
const path = require("path");
require('dotenv').config();

var swaggerUi = require("swagger-ui-express");
var swaggerDocument = require("./swagger.json");


/********routers */
const teacherRoute = require('./Routes/teacherRouter'); 
const childRoute = require('./Routes/childRouter');
const classRoute = require('./Routes/classRouter');
const loginRoute = require("./Routes/authentication");

/********image */
const storage=multer.diskStorage({
    destination:(req,file,imageFunction)=>{
        imageFunction(null,path.join(__dirname,"images"));
    },
    filename:(req,file,imageFunction)=>{
        imageFunction(null,new Date().toLocaleDateString().replace(/\//g,"-")+"_"+file.originalname);
    }
})
const fileFilter=(req,file,imageFunction)=>{
    if(file.mimetype=="image/jpeg"||
       file.mimetype=="image/jpg"||
       file.mimetype=="image/png")
       imageFunction(null,true) 
    else
    imageFunction(null,false)
}
const app = express();
const port=process.env.PORT;

/********connect to database */
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

/********use router */
app.use(loginRoute);
app.use(teacherRoute);
app.use(childRoute);
app.use(classRoute);

app.use('/swagger',swaggerUi.serve,swaggerUi.setup(swaggerDocument));
app.use((req,res)=>{
    res.status(404).json({data:"Not found"});
});

app.use((error,req,res,next)=>{
    res.status(500).json({data:` ${error}`});
})