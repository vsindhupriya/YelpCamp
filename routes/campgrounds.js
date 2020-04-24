var express = require("express");
var router  = express.Router();
var middleware = require("../middleware")
var Campground = require("../models/campground");


router.get("/",function(req, res){

    Campground.find({},function(err,camp){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index",{campgrounds: camp});
        }
    });
    
    //res.render("campgrounds",{campgrounds:campgrounds});
});

router.post("/",middleware.isLoggedIn,function(req, res){
    var name= req.body.name;
    var price=req.body.price;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id:req.user._id,
        username:req.user.username
    }
    var newcamp = {name: name,price:price, image:image,description:desc, author:author};

    //campgrounds.push(newcamp);
    Campground.create(newcamp,function(err,camp){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    })
});

router.get("/new",middleware.isLoggedIn,function(req, res){
  res.render("campgrounds/new");
});

router.get("/:id",function(req,res){
    //res.send("this is particular page");
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundcampground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show",{campground: foundcampground});
        }
    });
});

router.get("/:id/edit",middleware.checkCampgroundOwnership , function(req,res){
    Campground.findById(req.params.id,function(err,foundCampground){
    res.render("campgrounds/edit",{campground: foundCampground});
    });
})

router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){

    var editted={
        name:req.body.name,
        price:req.body.price,
        image:req.body.image,
        description:req.body.description
    };
console.log(editted);
    Campground.findByIdAndUpdate(req.params.id,editted,function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
        Campground.findByIdAndRemove(req.params.id, function(err){
            if(err){
                res.redirect("/campgrounds");
            }else{
                res.redirect("/campgrounds");
            }
        })
})



module.exports = router;