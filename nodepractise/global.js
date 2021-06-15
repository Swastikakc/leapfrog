// console.log (global);

setTimeout(() => {
    console.log ("In timeout");
    clearInterval(int); //stop interval
}, 3000);

const int = setInterval(() => {
    console.log ("In interval");
}, 1000);
// hit control c to cancel the terminal

console.log (__dirname);
console.log (__filename);

