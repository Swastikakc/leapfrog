const fs = require("fs");

//reading files
fs.readFile("./docs/blog1.txt", (err,data)=>{

    if (err){

        console.log(err);

    }

    console.log (data); //gives buffer
    console.log (data.toString());

});

//writing files
fs.writeFile("./docs/blog2.txt", "Hello World Ninja", ()=>{

    console.log ("File was written");

});

//directories

// first check if the folder exists
if (!fs.existsSync("./assets")){

    fs.mkdir("./assets", (err)=>{

        if (err){

            console.log(err);

        }

        console.log ("Folder Created");

    })

}
else {

// deleting the folder
    fs.rmdir("./assets", (err) => {

        if (err){

            console.log (err);

        }

        console.log ("Folder deleted");
        
    })

}

//deleting files

if (fs.existsSync("./docs/deleteme.txt")){

    fs.unlink ("./docs/deleteme.txt", (err)=>{

        if (err){
            
            console.log (err);

        }

        console.log("The file is deleted");

    })

}