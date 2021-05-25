// SELECT CVS
const cvs = document.getElementById("canvas");
const c = cvs.getContext("2d");


//dimension of canvas
cvs.width = window.innerWidth - 300;
cvs.height = window.innerHeight;

// LOAD SPRITE IMAGE
const sprite = new Image();
sprite.src = "./images/sprite.png";

// Load audio
var chickSound = new Audio();
chickSound.src = "./audio/chick.mp3";

var deadSound = new Audio();
deadSound.src = "./audio/dead.mp3";

var eggLaySound = new Audio();
eggLaySound.src = "./audio/egglaying.mp3";

var coopCounter = -1;
var chickenCounter = -1;
var coopFull;
var noCoop;
var money = 1000;
var pantry = 0;


const chickenCost = 0;
const coopCost = 0;
const eggCost = 50;
const feedCost = 25;
const collectCost = 500;
const growCost = 250;

var notice = "Welcome to Chicken Farm";
var screen = 0;

//for mouse
const mouse = {
    x: undefined,
    y: undefined
}

//for mouse
const mouseH = {
    x: undefined,
    y: undefined
}
