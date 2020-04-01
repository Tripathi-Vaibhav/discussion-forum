
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

const AddTeacher = mongoose.model("AddTeacher", addTeacherSchema);
const AdminLogin = mongoose.model("AdminLogin", adminLoginSchema);

// const login = new AdminLogin({
//     username: "qwerty",
//     pass: "789456123"
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


// app.post("/admin-login", function(req, res){ 
    
//     if(req.body.admin == "Admin")
//     res.redirect("/admin-login");    
// });


app.post("/admin-dashboard", function(req, res){ 

    if(req.body.submit == "Add"){

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

// app.post("/add-teacher", function(req, res){
//     if(req.body.addTeacher == "add")
//     res.redirect("/add-teacher");
// });

// app.post("/view-teacher", function(req, res){
//     if(req.body.viewTeacher == "view")
//     res.redirect("/view-teacher");
// });



app.listen(3000, function(){
    console.log("Server started at port 3000");    
});