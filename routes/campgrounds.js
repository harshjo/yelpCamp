const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware");


//Index route...
router.get("/campgrounds", (req, res)=>{
    Campground.find({}, (err, allCampgrounds)=>{
        if(err){
            req.flash("error", "Boy!, did something went horribly wrong.");
            console.log("Something Went Wrong\n");
            res.redirect("back");
        }
        else
            //console.log(allCampgrounds +"\n\n\n");
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
    });
});

//New route...
router.get("/campgrounds/new", middleware.isLoggedIn, (req, res)=>{
    res.render("campgrounds/new");
});

//Create route...
router.post("/campgrounds", middleware.isLoggedIn, (req, res)=>{
    var camp_name = req.body.camp_name;
    var camp_image = req.body.camp_image;
    var camp_description = req.body.camp_description;
    var camp_price = req.body.camp_price;
    // console.log(camp_name);
    //console.log(req.user);
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: camp_name, image: camp_image, price: camp_price, description: camp_description, author: author};
    Campground.create(newCampground, (err, createdCampgroud)=>{
        if(err){
            console.log("Something went wrong while adding new Campground\n");
            req.flash("error", "Something went wrong!");
            res.redirect("back");
        }
        else{
            req.flash("success", "Campground added!");
            res.redirect("/campgrounds");  
        }    
    });
});

//Show route
router.get("/campgrounds/:id", (req, res)=>{
    //res.redirect("back");
    Campground.findById(req.params.id).populate("comments").exec((err, returnedCampground)=>{
        if(err){
            req.flash("error", "Something went horribly wrong!");
            res.redirect("back");
            console.log("Error!!!");
        }
        else
            res.render("campgrounds/show", {Campground: returnedCampground});
    });
});

//Edit route
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, (req, res)=>{
    Campground.findById(req.params.id, (err, foundCampground)=>{
        if(err){
            req.flash("error", "Something went wrong!");
            res.redirect("back");
            console.log(err);
        }
        else{
            res.render("campgrounds/edit", {Campground: foundCampground});
        }   
    });
});

//Update route
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, (req, res)=>{
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err)=>{
        if(err){
            req.flash("error", "Something went wrong!");
            res.redirect("/campgrounds");
        }
        else{
            req.flash("success", "Campground edited!");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//Destroy route
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, (req, res)=>{
    Campground.findByIdAndDelete(req.params.id, (err)=>{
        if(err){
            req.flash("error", "Something went wrong!");
            res.redirect("/campgrounds/" + req.params.id);
        }
        else{
            req.flash("success", "Campground deleted!")
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;

