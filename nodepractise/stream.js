const fs = require("fs");

const readStream = fs.createReadStream("./docs/blog3.txt", {encoding: "utf8"});
const writeStream = fs.createWriteStream("./docs/blog4.txt");


readStream.on("data", (chunk) => {
    console.log ("<-----new Chunk------->");
    //console.log (chunk.toString()); 
    console.log (chunk); 
    writeStream.write("\nNewchunk\n")
    writeStream.write(chunk);
});

//or
//piping

readStream.pipe(writeStream);



