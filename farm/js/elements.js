function roundedRectangle(x, y, w, h)
{
  var mx = x + w / 2;
  var my = y + h / 2;
  c.beginPath();
  c.fillStyle="white";    
  c.moveTo(x,my);
  c.quadraticCurveTo(x, y, mx, y);
  c.quadraticCurveTo(x+w, y, x+w, my);
  c.quadraticCurveTo(x+w, y+h, mx, y+h);
  c.quadraticCurveTo(x, y+h, x, my);      
  c.fill();
}


class coop {
    constructor(coopNo) {

        this.coopNo = coopNo;
        this.occupied = 0;
        this.sX = 5;
        this.sY = 200;
        this.w = 115;
        this.h = 120;
        this.selfCollect = false;
        this.selfGrow = false;
        this.xCounter = this.coopNo % 6;
        this.x = (this.xCounter * this.w);
        this.yCounter = Math.floor(coopNo / 6);
        this.y = (cvs.height - 120) - (this.h * this.yCounter);
        this.activateCollect = "#FFFAFA";
        this.activateGrow = "#FFFAFA";
        this.screen = screen;
        };
        draw () {
            if (this.screen===screen){
                if (this.y < 0) {
                    return 1;
                }
                //draw coop
                c.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
    
                //draw selfCollect
                c.beginPath();
                c.arc(this.x + 20, this.y+20, 20, 0, Math.PI * 2, false); //x,y,radius,startangle,endangle, DRAW COUNTERCLOCKWISE
                c.fillStyle = this.activateCollect;
                c.fill();
                c.drawImage(sprite, this.sX + 3 * this.w + 50, this.sY, 200, 100, this.x + 10, this.y-10, 50, 50);
    
                // draw selfGrow
                c.beginPath();
                c.arc(this.x + 20, this.y + 90, 20, 0, Math.PI * 2, false); //x,y,radius,startangle,endangle, DRAW COUNTERCLOCKWISE
                c.fillStyle = this.activateGrow;
                c.fill();
    
            }
           
    }
}


//making chicken
class chicken {
    constructor(coopNo) {
        this.screen=screen;
        if (this.screen == 1){
            this.evolve = [{
                sX: 0,
                sY: 0
            },
            {
                sX: 180,
                sY: 0
            },
            {
                sX: 350,
                sY: 0
            },
            {
                sX: 180,
                sY: 185
            }
            ];
           
        }
        else if (this.screen == 2){
            this.evolve = [{
                sX: 0,
                sY: 0
            },
            {
                sX: 180,
                sY: 0
            },
            {
                sX: 0,
                sY: 340
            },
            {
                sX: 190,
                sY: 530
            }
            ];
            
        }
        this.w = 195;
        this.h = 195; 
       
        this.coopNo = coopNo;

        this.xCounter = this.coopNo % 6;
        this.yCounter = Math.floor(coopNo / 6);

        this.x = 25 + 120 * this.xCounter;
        this.y = cvs.height - 90 - (120 * this.yCounter);
       

        this.frame = 0;
        this.egg = 0;
        this.feed = false;
        this.screen=screen;

    }

    draw () {
        if (this.screen == screen) {
            let chicken = this.evolve[this.frame];
        if (this.y < 0) {
            return 1;
        }

        c.drawImage(sprite, chicken.sX, chicken.sY, this.w, this.h, this.x, this.y, 60 + 10 * this.frame, 60 + 5 * this.frame);

        if (this.egg !== 0) {
            c.beginPath();
            c.arc(this.x + 80, this.y - 10, 20, 0, Math.PI * 2, false); //x,y,radius,startangle,endangle, DRAW COUNTERCLOCKWISE
            c.fillStyle = "#ffcc00";
            c.fill();
            c.drawImage(sprite, 0, 0, this.w, this.h, this.x + 65, this.y - 25, 30, 30);
            c.font = "10px Arial";
            c.fillStyle = "#FF0000";
            c.fillText(this.egg, this.x + 85, this.y - 15);
        }

        if (this.feed == true) {
            c.beginPath();
            c.arc(this.x + 80, this.y - 10, 20, 0, Math.PI * 2, false); //x,y,radius,startangle,endangle, DRAW COUNTERCLOCKWISE
            c.fillStyle = "#ffcc00";
            c.fill();
            c.drawImage(sprite, 402, 390, 95, 95, this.x + 65, this.y - 25, 30, 30);
            c.font = "10px Arial";
            c.fillStyle = "#FF0000";
        }


        }
        
    };

    update () {
        if (this.screen == screen){
            this.feedChicken();

        if (this.frame >= 2) {
            this.eggCollect();

        }

        }

        


    };

    feedChicken () {
        if (this.feed == true) {
            if (money >= feedCost) {

                this.frame++;
                chickSound.play();
                money -= feedCost;
                this.feed = false;
                notice = "Chicken was fed";

            }
            else {
                notice = "Not enough Money";
            }

        }
    };
    eggCollect  () {

        if (this.egg > 0) {
            this.egg--;
            eggLaySound.play();
            pantry++;
            if (this.screen == 1){
                egg0++;
            }
            else if (this.screen == 2){
                egg1++;
            }
            notice = "Egg was collected";
        }
    };

}

class house {
    constructor(houseNo,locked){
       
        this.houseNo= houseNo;
        this.sX = 180;
        this.sY = 375;
        this.w = 180;
        this.h = 140;
        this.x= 100+ houseNo*250;
        this.y= cvs.height-300;
        this.houseSize = {
            x: 200,
            y: 200
        }
        this.locked = locked;
        this.hoverText = false;
        this.buttonY = 60;

    }
    draw(){
        c.fillStyle = "#964B00";
        c.fillRect(this.x+10, this.y-50, 180, 30);
        c.font = "15px Arial";
        c.fillStyle = "#FFFFFF";
        c.fillText("Chicken Farm "+(this.houseNo+1), this.x+40, this.y-30);
        
        c.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x,this.y , this.houseSize.x, this.houseSize.y );
        roundedRectangle(this.x+50,this.y +this.h+this.buttonY,100, 40);
        
       
        c.font = " bold 15px Arial";
        c.fillStyle = "#964B00";

        if (this.houseNo==0){
            
            c.fillText("Egg=" +egg0, this.x+70, this.y +this.h+this.buttonY+25);
        }
        else if (this.houseNo==1){
            
            c.fillText("Egg=" +egg1, this.x+70, this.y +this.h+this.buttonY+25);
        }

        if (this.locked==true){
            c.drawImage(sprite, 0, 550, this.w, this.h, this.x+40,this.y-20 , this.houseSize.x/1.5, this.houseSize.y/1.5 );
            if (this.hoverText==true){
                roundedRectangle(this.x, this.y-200, 220, 130);
                c.font = " bold 15px Arial";
                c.fillStyle = "#964B00";
                c.fillText("Rs. 10, 000 to unlock", this.x+40, this.y-160);
                c.fillText("Click the coop to unlock", this.x+30, this.y-120);
            }
             
        }
        else {
            if (this.hoverText==true){
                roundedRectangle(this.x, this.y-200, 220, 130);
                c.font = " bold 15px Arial";
                c.fillStyle = "#964B00";
                c.fillText("This Coop is ready", this.x+40, this.y-160);
                c.fillText("Click the coop to play", this.x+30, this.y-120);
            }
        }
    }
    
}


function noticeBoard(){
    // c.fillStyle = "#966F33";
    // c.fillRect(cvs.width-275, 20, 220, 150);
    // c.fillStyle = "#228B22";
    // c.fillRect(cvs.width-260, 35, 190, 120);
    roundedRectangle(cvs.width-260, 35, 190, 120)
    c.font = " bold 12px Arial";
    c.fillStyle = "#966F33";
    c.fillText(notice, cvs.width-250, 100);
    
}