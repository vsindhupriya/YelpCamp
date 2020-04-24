var express    = require("express");
var app        = express();
var bodyParser = require("body-parser");
var mongoose   = require("mongoose"),
flash          = require("connect-flash");
passport        = require("passport"),
methodOverride = require("method-override");
localStrategy =require("passport-local");
var Campground = require("./models/campground");
var Comment = require("./models/comment"),
User = require("./models/user");
var seedDB = require("./seeds");

var campgroundRoutes = require("./routes/campgrounds"),
commentRoutes        = require("./routes/comments"),
indexRoutes          = require("./routes/index");

//seedDB();
mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(flash());


app.use(require("express-session")({
    secret:"this is secret",
    resave:false,
    saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(
    function(req,res,next){
        res.locals.currentUser = req.user;
        res.locals.error = req.flash("error");
        res.locals.success = req.flash("success");
        next();
    })

app.use("/campgrounds",campgroundRoutes);
app.use(indexRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);




// Campground.create({
//     name:"camp site",
//     image: "https://www.photosforclass.com/download/pixabay-3893587?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F55e8dc404f5aab14f6da8c7dda793f7f1636dfe2564c704c7d2878d49745c65e_1280.jpg&user=FabricioMacedoPhotos",
//     description:"this is the camp"
    
// },function(err,camp){
//     if(err){
//         console.log("error");
//     }else{
//         console.log(camp);
//     }
// });

// Campground.create({
//     name:"tea and chill",
//     image: "https://www.photosforclass.com/download/pixabay-691424?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F50e9d4474856b108f5d084609620367d1c3ed9e04e507441722c7bd49f4ec3_1280.jpg&user=Free-Photos",
//     description:"this is the camp where this person is having tea like shruti n chilling like there are no worries in this world!!"
    
// },function(err,camp){
//     if(err){
//         console.log("error");
//     }else{
//         console.log(camp);
//     }
// });

// var campgrounds = [
//     {name: "salmon creek",image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpawnacamp.com%2Fcamping%2Fcamping-near-pune-for-couples&psig=AOvVaw1A6sbskHaBzBcjn5NsatS9&ust=1587375497178000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLCN2ueY9OgCFQAAAAAdAAAAABAZ"},
//     {name: "mountain hiking",image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.dfordelhi.in%2Fcamping-spots-delhi%2F&psig=AOvVaw1A6sbskHaBzBcjn5NsatS9&ust=1587375497178000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLCN2ueY9OgCFQAAAAAdAAAAABAD"},
//     {name: "sunrise",image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fnewtravelplans.com%2F2019%2F08%2F07%2Fgo-tent-camping-atop-misty-hills-of-munnar-with-amoeba-nature%2F&psig=AOvVaw1A6sbskHaBzBcjn5NsatS9&ust=1587375497178000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLCN2ueY9OgCFQAAAAAdAAAAABAI"},
//     {name: "lake tea n chill",image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.treksandtrails.org%2Fcollections%2Fthane-camping&psig=AOvVaw1A6sbskHaBzBcjn5NsatS9&ust=1587375497178000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCLCN2ueY9OgCFQAAAAAdAAAAABAO"},
//     {name: "new camp",image: "https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia.insider.in%2Fimage%2Fupload%2Fc_crop%2Cg_custom%2Fv1560695723%2Fhbv9e1izds6orzprwrk5.jpg&imgrefurl=https%3A%2F%2Finsider.in%2Fkolad-river-rafting-and-camping-get-set-camp-2019%2Fevent&tbnid=pUmCJLQj7KZ-6M&vet=12ahUKEwjln6zWmPToAhU7MLcAHTbRBW8QMygxegUIARCrAQ..i&docid=rPgwqO6eD5V8WM&w=1316&h=720&q=camping%20photos&ved=2ahUKEwjln6zWmPToAhU7MLcAHTbRBW8QMygxegUIARCrAQ"}
// ]








app.listen(3000,function(){
    console.log("app has started");
})