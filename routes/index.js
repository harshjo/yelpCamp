const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
//Home route...
router.get("/", (req, res)=>{
    res.render("landing");
});

//============\\
//Auth Routes\\
//=============\\

//Register Route
router.get("/register", (req, res)=>{
    res.render("register");
});

//Handle Sign up logic
router.post("/register", (req, res)=>{
    User.register(new User({username: req.body.username}), req.body.password, (err, user)=>{
        if(err){
            console.log(err);
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, ()=>{
            req.flash("success", `Welcome to YelpCamp, ${user.username}`);
            res.redirect("/campgrounds");
        });
    });
}); 

//show Login form
router.get("/login", (req, res)=>{
    res.render("login");
});

//Handling login logic
router.post("/login", 
    passport.authenticate("local",
    {
        successRedirect: "/campgrounds", 
        failureRedirect: "/login",
        failureFlash: true,
        // failureMessage: 'Wrong Id or Password!'
    }), (req, res)=>{
        // if(failureFlash) {
        //     req.flash('error', failureMessage)
        // }
});

//Logout Route
router.get("/logout", (req, res)=>{
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

module.exports = router;