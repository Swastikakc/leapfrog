var canvas = document.querySelector("canvas");

// setting height and width to full screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//getting context
var c = canvas.getContext("2d");

// making a rectangle
var rectWidth = canvas.width - 200;
var rectHeight = canvas.height - 200;
var rectX = 100;
var rectY = 100;
c.strokeRect(rectX, rectY, rectWidth, rectHeight); //x,y,width, height

function distance(x1, y1, x2, y2) {

    const xDist = x2 - x1;
    const yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function rotate(velocity,angle) {

    const rotateVelocities = {
        x: velocity.x*Math.cos(angle)-velocity.y* Math.sin(angle),
        y: velocity.x*Math.sin(angle)+velocity.y* Math.cos(angle)
    };
   
    return rotateVelocities;
    
}

function resolve(particle1, particle2) {

    //taking difference in velocity
    const xVelocityDiff = particle1.velocity.x-particle2.velocity.x;
    const yVelocityDiff = particle1.velocity.y-particle2.velocity.y;

    //taking distance
    const xDist = particle2.x-particle1.x;
    const yDist = particle2.y-particle1.y;

    //To prevent accidental overlap of particles
    if ((xVelocityDiff * xDist + yVelocityDiff * yDist) >= 0){

        //angle between two colliding particles
        const angle = -Math.atan2( particle2.y-particle1.y, particle2.x-particle1.x );
   

    //taking mass of the circle
    const m1 = particle1.mass;
    const m2 = particle2.mass;
    //velocity before 
    const u1 = rotate (particle1.velocity, angle);

    const u2 = rotate (particle2.velocity, angle);
   
    //velocity after 1d collision equation
    const v1 = { x: u1.x*(m1-m2)/(m1+m2)+u2.x*2*m2/(m1+m2), y:u1.y };
    const v2 = { x: u2.x*(m1-m2)/(m1+m2)+u1.x*2*m2/(m1+m2), y:u2.y };

    // final velocity rotating back to origin
    const vf1 = rotate (v1,-angle);
    const vf2 = rotate (v2,-angle);

    particle1.velocity.x= vf1.x;
    particle1.velocity.y = vf1.y;

    particle2.velocity.x = vf2.x;
    particle2.velocity.y = vf2.y;
    }
}

function Circle(x, y, velocity, radius) {

    this.x = x;
    this.y = y;
    this.velocity = {x:velocity.x, y: velocity.y}
    this.radius = radius;
    this.mass = 1;

    // for generating random color
    this.color = "#";
    for (var i = 0; i < 6; i++) {
        this.color += Math.round(Math.random() * 15);
    }


    // arc/ Circle
    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false); //x,y,radius,startangle,endangle, DRAW COUNTERCLOCKWISE
        c.fillStyle = this.color;
        c.fill();
    }


    this.update = function () {

        for (var u = 0; u < circleArray.length; u++) {

            if (this === circleArray[u]) {
                continue;
            }

            if (distance(this.x, this.y, circleArray[u].x, circleArray[u].y) - (this.radius + circleArray[u].radius) < 0) {
               
                resolve(this, circleArray[u]);
            }
        }

        if ((this.x + this.radius) >= rectWidth + rectX || (this.x - this.radius) <= rectX) {
            this.velocity.x = -this.velocity.x;
        }

        if ((this.y + this.radius) >= rectHeight + rectY || (this.y - this.radius) <= rectY) {
            this.velocity.y = -this.velocity.y;
        }
       
        
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        this.draw();

    }

}

var circleArray = [];

//CREATING ARRAY OF CIRCLE
for (var i = 0; i < 100; i++) {
    //taking random xand y var
    // Random gives value between 0 and 1 so taking it to the whole screen by multiplying it
    var radius = 15 * Math.random()
    var x = Math.random() * (rectWidth - 2 * radius) + rectX + radius;
    var y = Math.random() * (rectHeight - 2 * radius) + rectY + radius;
    var velocity= {
        x: (Math.random() - 0.5) * 5, //-0.5 gives either negative or positive value
        y:(Math.random() - 0.5) * 5
    };
   
// circle is not colliding
    if (i != 0) {

        for (var j = 0; j < circleArray.length; j++) {

            if (distance(x, y, circleArray[j].x, circleArray[j].y) - (radius + circleArray[j].radius) < 0) {
                x = Math.random() * (rectWidth - 2 * radius) + rectX + radius;
                y = Math.random() * (rectHeight - 2 * radius) + rectY + radius;

                j = -1;
            }
        }
    }

    circleArray.push(new Circle(x, y, velocity, radius));


}