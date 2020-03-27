
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/adminDB", {useNewUrlParser: true, useUnifiedTopology:true});

const addTeacherSchema = new mongoose.Schema({

    email: String,
    contactNo: String,
    password: String
});

const AddTeacher = mongoose.model("AddTeacher", addTeacherSchema);


app.get("/admin-dashboard", function(req, res){
    res.render("admin-dashboard");
});

app.get("/add-teacher", function(req, res){
    res.render("add-teacher");
});

app.post("/admin-dashboard", function(req, res){
          
    if(req.body.addTeacher == "submit")
    res.redirect("/add-teacher");

    if(req.body.add == "added"){

        const newTeacher = new AddTeacher({
            email: req.body.Email,
            contactNo: req.body.Contact,
            password: req.body.Pass
        });

        if(newTeacher.email == "" || newTeacher.contactNo == "" || newTeacher.password == "")
        res.redirect("/add-teacher");

        else{
            newTeacher.save(function(){
                res.redirect("/admin-dashboard");
            });
        }        
    }   
});



app.listen(3000, function(){
    console.log("Server started at port 3000");    
});