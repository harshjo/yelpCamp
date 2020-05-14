const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const User = require("./models/user");

let data = [
    {
        name: "The Rock",
        image: "https://images.unsplash.com/photo-1544939514-aa98d908bc47?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus proin nibh nisl condimentum id venenatis a condimentum. Vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor posuere. Id aliquet lectus proin nibh. Nullam non nisi est sit amet. Semper auctor neque vitae tempus. Ut tortor pretium viverra suspendisse potenti nullam. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Pretium quam vulputate dignissim suspendisse in. Nunc sed velit dignissim sodales ut."
    },
    {
        name: "Hidden Forest",
        image: "https://images.unsplash.com/photo-1465429388896-e249d8072c95?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus proin nibh nisl condimentum id venenatis a condimentum. Vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor posuere. Id aliquet lectus proin nibh. Nullam non nisi est sit amet. Semper auctor neque vitae tempus. Ut tortor pretium viverra suspendisse potenti nullam. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Pretium quam vulputate dignissim suspendisse in. Nunc sed velit dignissim sodales ut."
    },
    {
        name: "Cloud's Rest",
        image: "https://images.unsplash.com/photo-1489219335359-ff3e958d1dc8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=811&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus proin nibh nisl condimentum id venenatis a condimentum. Vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor posuere. Id aliquet lectus proin nibh. Nullam non nisi est sit amet. Semper auctor neque vitae tempus. Ut tortor pretium viverra suspendisse potenti nullam. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Pretium quam vulputate dignissim suspendisse in. Nunc sed velit dignissim sodales ut."
    },
    {
        name: "Chernobyl",
        image: "https://images.unsplash.com/photo-1558891704-404265e3eaf1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lectus proin nibh nisl condimentum id venenatis a condimentum. Vulputate enim nulla aliquet porttitor lacus luctus accumsan tortor posuere. Id aliquet lectus proin nibh. Nullam non nisi est sit amet. Semper auctor neque vitae tempus. Ut tortor pretium viverra suspendisse potenti nullam. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt. Pretium quam vulputate dignissim suspendisse in. Nunc sed velit dignissim sodales ut."
    }
]

module.exports = function seedDB(){
    //Remove all Users
    User.deleteMany({}, (err)=>{
        if(err)
            console.log(err);
        else    
            console.log("Deleted all users");
    });
    //Remove all comments
    Comment.deleteMany({}, (err)=>{
        if(err)
            console.log(err);
        else    
            console.log("Comments Removed!");
    });
    //Remove all campgrounds
    Campground.deleteMany({}, (err)=>{
        if (err)
            console.log(err);
        else{
            console.log("Removed Campgrounds!");
            //add a few campgrounds
            data.forEach((seed)=>{
                Campground.create(seed, (err, campground)=>{
                    if(err)
                        console.log("Error in seed!!");
                    else{
                        console.log("Data Added from seeds.js!");
                        //create a comment
                        Comment.create({
                            text: "It's a great place but I wish there was internet!",
                            author: "Homer"
                        }, (err, comment)=>{
                            if(err)
                                console.log("Error in comment of seed.js!");
                            else{
                                campground.comments.push(comment);
                                campground.save();
                                console.log("Created a Comment!");
                            }
                        });
                    }
                });
            });
        }
    });
}
