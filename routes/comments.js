const express = require("express");
const router = express.Router();
const Comment = require("../models/comment.js");
const Campground = require("../models/campground.js");
const middleware = require("../middleware");

//New route
router.get("/campgrounds/:id/comments/new", middleware.isLoggedIn, (req, res)=>{
    Campground.findById(req.params.id, (err, campground)=>{
        if (err) {
            req.flash("error", "Something went wrong!");
            res.redirect("back");
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

//Create Route
router.post("/campgrounds/:id/comments", middleware.isLoggedIn, (req, res)=>{
    //look up campground using id
    Campground.findById(req.params.id, (err, campground)=>{
        if (err) {
            req.flash("error", "Something went wrong!");
            res.redirect("back");
            console.log(err);
        } else {
            Comment.create(req.body.comment, (err, comment)=>{
                if (err) {
                    req.flash("error", "Something went wrong!");
                    res.redirect("back");
                    console.log("err");
                } else {
                    //Add id and username to comment using req.User object..
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    req.flash("success", "Comment added!");
                    res.redirect("/campgrounds/" +campground._id);
                }
            });
        }
    });
});

//Edit Route
router.get("/campgrounds/:id/comments/:comment_id/edit", middleware.checkCommentOwnership, (req, res)=>{
    Comment.findById(req.params.comment_id, (err, foundComment)=>{
        if(err){
            req.flash("error", "Something went wrong!");
            res.redirect("back");
        }
        else{
            res.render("comments/edit", {comment: foundComment, campground_id: req.params.id});
        }
    });
});

//Update Route
router.put("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, (req, res)=>{
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, UpdatedComment)=>{
        if(err){
            req.flash("error", "Something went wrong");
            res.redirect("back");
        }
        else{
            req.flash("success", "Comment edited!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//Destroy route
router.delete("/campgrounds/:id/comments/:comment_id", middleware.checkCommentOwnership, (req, res)=>{
    Comment.findByIdAndDelete(req.params.comment_id, (err)=>{
        if(err){
            req.flash("error", "Something went wrong");
            res.redirect("back");
        }
        else{
            req.flash("success", "Comment deleted");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

module.exports = router;