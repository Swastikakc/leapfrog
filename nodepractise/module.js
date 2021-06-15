const xyz = require ("./people"); // runs people.js files
console.log (xyz); // returns an empty object unless people exports something
console.log (xyz.people);
console.log (xyz.ages);

const {people} = require ("./people"); // only takes people must have the same name as export
console.log (people);

const os = require("os");
console.log (os);
console.log(os.platform(), os.homedir());