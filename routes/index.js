var express = require("express");
var passport = require("passport");
var middleware = require("../middleware")
var User = require("../models/user");
var router  = express.Router();

router.get("/",function(req, res){
    res.render("landing")
});


router.get("/register",function(req,res){
    res.render("register");
})

router.post("/register",function(req,res){
    var newUser = new User({username: req.body.username})
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            //console.log(err);
            req.flash("error",err.message); //passport alreday has list of all kinds of errors
            return res.render("register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success", "Welcome to YelpCamp " + req.body.username);
            res.redirect("/campgrounds");
        })
    })
})


router.get("/login",function(req,res){
    res.render("login");
})

router.post("/login", passport.authenticate("local",
        {
            successRedirect:"/campgrounds",
            failureRedirect: "/login"
        }),function(req,res){

})

router.get("/logout",function(req,res){
    req.logOut();
    req.flash("success","Logged you out!")
    res.redirect("/campgrounds");
})

module.exports = router;