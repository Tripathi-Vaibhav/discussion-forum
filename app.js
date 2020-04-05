
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-vaibhav:discussion@cluster0-750gz.mongodb.net/adminDB", {useNewUrlParser: true, useUnifiedTopology:true});

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

const acceptedStudentSchema = new mongoose.Schema({

    name: String,
    email: String,
    contactNo: String,
    roll: String,
    password: String    
});

const AddTeacher = mongoose.model("AddTeacher", addTeacherSchema);
const AdminLogin = mongoose.model("AdminLogin", adminLoginSchema);
const AddNewStudent = mongoose.model("AddNewStudent", addNewStudentSchema);
const AcceptNewStudent = mongoose.model("AcceptNewStudent", acceptedStudentSchema);

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

    else{
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
    }              
});

app.post("/view-student", function(req, res){

    const studentID = req.body.accept;

    AddNewStudent.findById(studentID, function(err, student){
        const acceptedStudent = new AcceptNewStudent({
            name: student.name,
            email: student.email,
            contactNo: student.contactNo,
            roll: student.roll,
            password: student.password  
        });

        acceptedStudent.save(function(){
            console.log("Successfully added document");
            
        });
    });
    
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function(){
    console.log("Server started successfully");    
});