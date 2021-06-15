const people = ["Yosji", "Mosi", "sosi"];
const ages = [23,54,56,55];

console.log (people);

//exporting the value of people to the module that requires this file
module.exports = {
    people : people,
    ages : ages
} 