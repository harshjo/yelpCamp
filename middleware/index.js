const Campground = require("../models/campground");
const Comment = require("../models/comment");

//All the middleware goes here
let middlewareObj = {}

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, (err, foundCampground)=>{
            if(err){
                req.flash("error", "Campground not found!");
                res.redirect("back");
            }
            else{
                if(req.user._id.equals(foundCampground.author.id)){
                    next();
                }
                else{
                    req.flash("error", "Permission Denied");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, (err, foundComment)=>{
            if(err){
                req.flash("error", "Something went wrong!")
                res.redirect("back");
            }
            else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }
                else{
                    req.flash("error", "Permission Denied");
                    res.redirect("back");
                }
            }
        });
    }
    else{
        req.flash("error", "YOu need to be logged in to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that");
    res.redirect("/login");
}
module.exports = middlewareObj;