const express = require ("express");

//express app
const app = express();

//register view engine
app.set("view engine", "ejs");

//view engine looks at views folder for ejs html files so to change we have to do the following:
    //app.set ("views","name of the folder where u ll be saving the html files for ejs");

//listen for request
app.listen(3000);

app.get("/", (req,res) => {

    //res.send("<p>home page</p>");//send to be used with express, inferes the type of content as well as status code
    //res.sendFile("./views/index.html", {root:__dirname}) // root because this doesnt take relative path
    res.render("index", { title : "Home"});
})

app.get("/about", (req,res) => {

    //res.send("<p>about page </p>");//send to be used with express, inferes the type of content as well as status code
    //res.sendFile("./views/about.html", {root:__dirname})
    res.render("about", { title : "About"});
})

app.get("/blogs/create", (req,res) => {

    res.render("create", { title : "Create"});
})

//redirect
app.get("/about-us",(req,res)=>{
    res.redirect("/about");
});

//404 page
app.use((req,res) => {
    res.status(404).render("404", { title : "404"})//.sendFile("./views/404.html", {root:__dirname}) //fires regardless of url if the code reaches this point
}) //must be at the bottom