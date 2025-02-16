var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
        if(req.isAuthenticated()){
            Campground.findById(req.params.id,function(err,foundCampground){
                if(err){
                    res.redirect("back");
                }else{
                    // if(foundcampground.author.id === re.user._id) they r not equal because one is object n other is string
                    if(foundCampground.author.id.equals(req.user._id)){
                        return next();
                    }else{
                        req.flash("error","You don't have permission to do that!")
                        res.redirect("back");
                    }
                }
            })

    }else{
            req.flash("error","You don't have permission to do that!")
            res.redirect("back");
    }
}
 
middlewareObj.checkCommentsOwnership = function(req, res, next){
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id,function(err,foundComment){
                if(err){
                    req.flash("error","campground not found")
                    res.redirect("back");
                }else{
                    // if(foundcampground.author.id === re.user._id) they r not equal because one is object n other is string
                    if(foundComment.author.id.equals(req.user._id)){
                        return next();
                    }else{
                        req.flash("error","You don't have permission to do that!")
                        res.redirect("back");
                    }
                }
            })

    }else{
            req.flash("error","You need to be Logged in to do that!")
            res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be Logged into do that!");
    res.redirect("/login");
}


module.exports = middlewareObj;