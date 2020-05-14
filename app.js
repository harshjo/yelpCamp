//require() is used to include modules in nodeJS
const express = require("express");
const app = express(); //Creates a new Express application
const bodyParser = require("body-parser"); //Used to parse incoming request bodies in the middle
// ODM is used to translate between objects in code and the representation of those objects in MongoDB...
const mongoose = require("mongoose"); //Object data modelling Library for MongoDB and nodeJS
const passport = require("passport"); //Used for user authentication(register/login)
const passportLocal = require("passport-local"); //Sets auth strategy to local
const passportLocalMongoose = require("passport-local-mongoose"); //Not sure what this does
const flash = require("connect-flash");
const methodOverride = require("method-override");
//Exporting mongoose models
const Campground = require("./models/campground"); 
const Comment = require("./models/comment");
const User = require("./models/user");

const campgroundRoutes = require("./routes/campgrounds");
const indexRoutes = require("./routes/index");
const commentRoutes = require("./routes/comments");

var seedDB = require("./seeds");

//seedDB(); //seeding the database
//mongoose deprecation warning removal :-
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

app.use(flash());
//======================
//Passport Configuration
//======================
app.use(require("express-session")({
    secret: "boy I am sipping tea in yo hood",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//=================
//
//=================
// mongoose.connect("mongodb://localhost/yelp_camp"); //mongoDb connection string
mongoose.connect("mongodb+srv://admin:cgpa8.0000@cluster0-cl0cp.mongodb.net/test?retryWrites=true&w=majority");
app.use(express.static('public'));   //Serves the public directory
console.log(__dirname +'/public');
app.use(bodyParser.urlencoded({extended: true}));//For Parsing URL encoded data (req.body.___)
//View Engine is responsible for rendering the view into html form to the browser...
app.set("view engine", "ejs");
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");

    next();
});
app.use(methodOverride("_method"));

//======
//Routes
//======
app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);

//=============
//Server Starter
//=============

//For Starting server at specified port number...
app.set( 'port', ( process.env.PORT || 5000 ));
app.listen(app.get('port'), ()=>{
    console.log("Server started at port number " +app.get('port'));
});