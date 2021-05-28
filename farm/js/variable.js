// SELECT CVS
const cvs = document.getElementById("canvas");
const c = cvs.getContext("2d");


//dimension of canvas
cvs.width = window.innerWidth - 300;
cvs.height = window.innerHeight;

// LOAD SPRITE IMAGE
const sprite = new Image();
sprite.src = './images/sprite.png';
const bg = new Image();
bg.src = './images/bg.png';
const back = new Image();
back.src = './images/back.jpg';
const dead = new Image();
dead.src = './images/dead.png';

var fillColor = "#966F33";

// Load audio
var gameOver = new Audio();
gameOver.src = "./audio/gameover.wav";

var amb = new Audio();
amb.src = "./audio/amb.wav";

var coin = new Audio();
coin.src = "./audio/coin.wav";

var chickSound = new Audio();
chickSound.src = "./audio/chick.mp3";

var deadSound = new Audio();
deadSound.src = "./audio/dead.mp3";

var eggLaySound = new Audio();
eggLaySound.src = "./audio/egglaying.mp3";

var click = new Audio();
click.src = "./audio/click.wav";

var coopCounter0 = -1;
var coopCounter1 = -1;
var chickenCounter = -1;
var coopFull;
var noCoop;
var money = 11000;
var pantry = 0;
var egg0=0;
var egg1=0;
var egg0Sell = false;
var egg1Sell = false;
var adultChicken = 0;



const chickenCost = 100;
const coopCost = 300;
const eggCost1 = 50;
const eggCost2 = 55;
const feedCost = 25;
const collectCost = 500;//500
const growCost = 250;//250

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


var coopButton = document.getElementById("coop");
var chickenButton = document.getElementById("chicken");
var pantryVisible = document.getElementById("sell");