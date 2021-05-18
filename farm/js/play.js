// SELECT CVS
const cvs = document.getElementById("canvas");
const c = cvs.getContext("2d");

i=-1;
//for mouse
const mouse = {
 x : undefined,
 y : undefined
}

//dimension of canvas
cvs.width = window.innerWidth-300;
cvs.height = window.innerHeight;

// LOAD SPRITE IMAGE
const sprite = new Image();
sprite.src = "./images/sprite.png";

//making coop
var coop = function(){
    
    sX = 0;
    sY = 200;
    w = 120;
    h = 120;
    x = 0;
    y = cvs.height-120;
    coopNo = undefined;


    this.draw = function(){

        c.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        
    }
    this. update = function (){
        this.draw();
    }
    

}

//making chicken
const chicken ={
    evolve : [
       {sX : 0, sY: 0}, 
       {sX : 180, sY:0},
       {sX :350, sY:0}
    ],
    x : 20,
    y : cvs.height-90,
    w : 195,
    h : 195,
    coopNo : undefined,

    frame : 0,

    draw : function(){
        let chicken = this.evolve[this.frame];
        
        c.drawImage(sprite, chicken.sX, chicken.sY, this.w, this.h,this.x, this.y, 80, 80);
        
    },

    update : function (){
        if (Math.abs(this.x+50-mouse.x)<50 && Math.abs(this.y+50-mouse.y)<50){
            if (this.frame<2){
                this.frame++;
            }
            
        }

    }
}

window.addEventListener ('click', function (event){
    mouse.x = event.x;
    mouse.y = event.y;
    chicken.update();
})

// place = [];
// function addCoop(){
//     console.log ("i is incremented")
//     place.push  (new coop);
//     console.log (place);
// }

place = new coop;

// function to draw
function draw(){
    place.draw();
    chicken.draw();
}

//loop
function loop(){
    c.fillStyle = "#964B00";
    c.fillRect(0, 0, cvs.width, cvs.height);
    draw();
    requestAnimationFrame(loop);
}
loop();