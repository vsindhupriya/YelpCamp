var express = require("express");
var router  = express.Router({mergeParams: true});
var middleware = require("../middleware")
var Campground = require("../models/campground");
var Comment = require("../models/comment");

router.get("/new", middleware.isLoggedIn ,function(req, res){
    Campground.findById(req.params.id,function(err, campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground:campground});
        }
    });
});


router.post("/",middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds")
        }else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error","Something Went wrong")
                    console.log(err);
                }else{
                     comment.author.id = req.user._id;
                     comment.author.username =req.user.username;
                     comment.save();
                     campground.comments.push(comment);
                    campground.save();
                    req.flash("success","Successfully added Comment")
                    res.redirect('/campgrounds/' + campground._id);
                }
            })
        }
    })
})

router.get("/:comment_id/edit",middleware.checkCommentsOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit",{campground_id: req.params.id,comment :foundComment});

        }
    })
})

router.put("/:comment_id",middleware.checkCommentsOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment,next){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/" +req.params.id);
        }
    })
})

router.delete("/:comment_id",middleware.checkCommentsOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success","Successfully removed comment")
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})


module.exports = router;