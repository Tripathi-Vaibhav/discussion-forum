
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

const adminLoginSchema = new mongoose.Schema({

    username: String,
    pass: String
});

const addNewStudentSchema = new mongoose.Schema({

    name: String,
    email: String,
    contactNo: String,
    roll: String,
    password: String
});

const AddTeacher = mongoose.model("AddTeacher", addTeacherSchema);
const AdminLogin = mongoose.model("AdminLogin", adminLoginSchema);
const AddNewStudent = mongoose.model("AddNewStudent", addNewStudentSchema);

// const login = new AdminLogin({
//     username: "qwerty",
//     pass: "0"
// });

// login.save();

app.get("/", function(req, res){
    res.render("index");
});

app.get("/admin-login", function(req, res){
    res.render("admin/admin-login");
});

app.get("/admin-dashboard", function(req, res){
    res.render("admin/admin-dashboard");
});

app.get("/add-teacher", function(req, res){
    res.render("admin/add-teacher");
});

app.get("/view-teacher", function(req, res){

    AddTeacher.find(function(err, teachers){
        res.render("admin/view-teacher", {teacherList: teachers});
    });    
});

app.get("/teacher", function(req, res){
    res.render("teachers/teacher");
});

app.get("/view-student", function(req, res){

    AddNewStudent.find(function(err, students){
        res.render("admin/view-student", {registeredStudents: students});
    });    
});

app.get("/student-register", function(req, res){
    res.render("students/student-register");
});


app.post("/", function(req, res){

    if(req.body.submit == "add-student"){

        const newStudent = new AddNewStudent({
            name: req.body.Name,
            email: req.body.Email,
            contactNo: req.body.Contact,
            roll: req.body.Roll,
            password: req.body.Pass
        });

        if(newStudent.Name == "" || newStudent.email == "" || newStudent.contactNo == "" || newStudent.password == "" || newStudent.roll == "")
        res.redirect("/student-register");

        else{
            newStudent.save(function(){
                res.redirect("/");
            });
        }        
    }
});


app.post("/admin-dashboard", function(req, res){ 

    if(req.body.submit == "add-teacher"){

        const newTeacher = new AddTeacher({
            name: req.body.Name,
            email: req.body.Email,
            contactNo: req.body.Contact,
            password: req.body.Pass
        });

        if(newTeacher.Name == "" || newTeacher.email == "" || newTeacher.contactNo == "" || newTeacher.password == "")
        res.redirect("/add-teacher");

        else{
            newTeacher.save(function(){
                res.redirect("/admin-dashboard");
            });
        }        
    }

        AdminLogin.findOne({}, function(err, adminCredentials){
            if(err)
            console.log(err);

            else{
                if(adminCredentials.username == req.body.user && adminCredentials.pass == req.body.pass){          
                   if(req.body.Submit == "Login")
                   res.redirect("/admin-dashboard");
                }               

                else{                    
                    console.log("Invalid Credentials!");                    
                    res.redirect("/admin-login");
                }
            }            
        });       
});



app.listen(3000, function(){
    console.log("Server started at port 3000");    
});