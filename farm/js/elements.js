class coop {
    constructor(coopNo) {

        this.coopNo = coopNo;
        this.occupied = 0;
        this.sX = 10;
        this.sY = 200;
        this.w = 120;
        this.h = 120;
        this.selfCollect = false;
        this.selfGrow = false;
        this.xCounter = this.coopNo % 6;
        this.x = (this.xCounter * this.w);
        this.yCounter = Math.floor(coopNo / 6);
        this.y = (cvs.height - 120) - (this.h * this.yCounter);
        this.activateCollect = "#FFFAFA";
        this.activateGrow = "#FFFAFA";
        };
        draw () {
            if (this.y < 0) {
                return 1;
            }
            //draw coop
            c.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);

            //draw selfCollect
            c.beginPath();
            c.arc(this.x + 20, this.y + 30, 15, 0, Math.PI * 2, false); //x,y,radius,startangle,endangle, DRAW COUNTERCLOCKWISE
            c.fillStyle = this.activateCollect;
            c.fill();
            c.drawImage(sprite, this.sX + 3 * this.w + 50, this.sY, 200, 100, this.x + 10, this.y, 50, 50);

            // draw selfGrow
            c.beginPath();
            c.arc(this.x + 15, this.y + 80, 15, 0, Math.PI * 2, false); //x,y,radius,startangle,endangle, DRAW COUNTERCLOCKWISE
            c.fillStyle = this.activateGrow;
            c.fill();

    }
}


//making chicken
class chicken {
    constructor(coopNo) {
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
        this.coopNo = coopNo;

        this.xCounter = this.coopNo % 6;
        this.yCounter = Math.floor(coopNo / 6);

        this.x = 20 + 120 * this.xCounter;
        this.y = cvs.height - 90 - (120 * this.yCounter);
        this.w = 195;
        this.h = 195;

        this.frame = 0;
        this.egg = 0;
        this.feed = false;

    }

    draw () {
        let chicken = this.evolve[this.frame];
        if (this.y < 0) {
            return 1;
        }

        c.drawImage(sprite, chicken.sX, chicken.sY, this.w, this.h, this.x, this.y, 60 + 10 * this.frame, 60 + 10 * this.frame);

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

    };

    update () {

        this.feedChicken();

        if (this.frame >= 2) {
            this.eggCollect();

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
            notice = "Egg was collected";
        }
    };

}

class house {
    constructor(houseNo){
       
        this.houseNo= houseNo;
        this.sX = 180;
        this.sY = 375;
        this.w = 200;
        this.h = 200;
        this.x= 100+ houseNo*250;
        this.y= cvs.height-300;
        this.houseSize = {
            x: 200,
            y: 200
        }

    }
    draw(){
        c.fillStyle = "#964B00";
        c.fillRect(this.x+10, this.y-50, 180, 30);
        c.font = "15px Arial";
        c.fillStyle = "#FFFFFF";
        c.fillText("Chicken Farm"+this.houseNo, this.x+40, this.y-30);
        c.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x,this.y , this.houseSize.x, this.houseSize.y );
    }
    
}