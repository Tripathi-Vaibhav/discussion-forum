
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/adminDB", {useNewUrlParser: true, useUnifiedTopology:true});

const addTeacherSchema = new mongoose.Schema({

    name: String,
    email: String,
    contactNo: String,
    password: String
});

const AddTeacher = mongoose.model("AddTeacher", addTeacherSchema);


app.get("/admin/admin-dashboard", function(req, res){
    res.render("admin-dashboard");
});

app.get("/admin/add-teacher", function(req, res){
    res.render("add-teacher");
});

app.get("/admin/view-teacher", function(req, res){

    AddTeacher.find(function(err, teachers){
        res.render("view-teacher", {teacherList: teachers});
    });    
});

app.post("/admin/admin-dashboard", function(req, res){
          
    if(req.body.addTeacher == "add")
    res.redirect("/admin/add-teacher");

    if(req.body.viewTeacher == "view")
    res.redirect("/admin/view-teacher");

    if(req.body.add == "added"){

        const newTeacher = new AddTeacher({
            name: req.body.Name,
            email: req.body.Email,
            contactNo: req.body.Contact,
            password: req.body.Pass
        });

        if(newTeacher.Name == "" || newTeacher.email == "" || newTeacher.contactNo == "" || newTeacher.password == "")
        res.redirect("admin/add-teacher");

        else{
            newTeacher.save(function(){
                res.redirect("/admin/admin-dashboard");
            });
        }        
    }   
});



app.listen(3000, function(){
    console.log("Server started at port 3000");    
});