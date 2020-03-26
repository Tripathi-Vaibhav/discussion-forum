
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));


app.get("/admin-dashboard", function(req, res){
    res.render("admin-dashboard");
});

app.get("/add-teacher", function(req, res){
    res.render("add-teacher");
});

app.post("/admin-dashboard", function(req, res){
          
    if(req.body.addTeacher == "submit")
    res.redirect("/add-teacher");
    
});


app.listen(3000, function(){
    console.log("Server started at port 3000");    
});