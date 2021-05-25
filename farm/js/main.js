chickHouse = [];
chickHouse.push(new house(0));
chickHouse.push(new house(1));
console.log(chickHouse);

function draw(){

    if (screen==0){
        
        //for sky
        c.fillStyle = "#87ceeb";
        c.fillRect(0, 0, cvs.width, cvs.height);

        //for grass
        c.fillStyle = "#7cfc00";
        c.fillRect(0, cvs.height-200, cvs.width, 200);

        //for 2 house
        chickHouse[0].draw();
        chickHouse[1].draw();
        // c.drawImage(sprite, 0, 650, 200, 200, 440,cvs.height-280 , 200, 200);


    }
    else if (screen ==1){
        for (var j = 0; j < place.length; j++) {
            coopFull = place[j].draw();
            if (coopFull === 1) {
                place.pop(j);
            }
        }
        for (var j = 0; j < chick.length; j++) {
            noCoop = chick[j].draw();
            if (noCoop === 1) {
                chick.pop(j);
            }
        }
        noticeBoard();
    }
   
}

function update(){
    if (screen==0){
        for (var j= 0; j < chickHouse.length; j++){
            //on hovering in house increase the house size
            if (Math.abs(chickHouse[j].x+100-mouseH.x)<100 && Math.abs(chickHouse[j].y+100-mouseH.y)<100){
                chickHouse[j].houseSize.x = 220;
                chickHouse[j].houseSize.y = 220; 
            }
            else{
                chickHouse[j].houseSize.x = 200;
                chickHouse[j].houseSize.y = 200;  
            }
    
        }
        // on click
        if (Math.abs(chickHouse[0].x+100-mouse.x)<100 && Math.abs(chickHouse[0].y+100-mouse.y)<100){
            screen=1;
        }
    }
   
    else if(screen == 1){
        //to grow chicken
    for (var j = 0; j < chick.length; j++) {
        if (Math.abs(chick[j].x + 50 - mouse.x) < 50 && Math.abs(chick[j].y + 50 - mouse.y) < 50) {
            chick[j].update();
            mouse.x=undefined;
            mouse.y=undefined;
        }

        //when hover
        if (Math.abs(chick[j].x + 50 - mouseH.x) < 30 && Math.abs(chick[j].y + 50 - mouseH.y) < 30) {
            if(chick[j].frame==2){
                chick[j].frame = 3;
                chickSound.play();
            }
            
            
        }
        else if (Math.abs(chick[j].x + 50 - mouseH.x) >= 30 || Math.abs(chick[j].y + 50 - mouseH.y) >=30){
           if(chick[j].frame==3){
            chick[j].frame = 2;
           } 
        }
    }

    
        for (var j = 0; j < place.length; j++) {

            // collect automate
            if (Math.abs(place[j].x + 20 - mouse.x) < 25 && Math.abs(place[j].y + 30 - mouse.y) < 25 && money >= collectCost) {
              if (place[j].selfCollect == false){
                place[j].selfCollect = true;
                place[j].activateCollect = "#339691"
                money -= collectCost;
                notice = "Collect is On";
              } 
            }
            else if (Math.abs(place[j].x + 20 - mouse.x) < 25 && Math.abs(place[j].y + 30 - mouse.y) < 25 && money <collectCost){
                
                notice = "Not enough Money collect="+collectCost; 
        
        } 
        
        // grow automate
            if (Math.abs(place[j].x + 15 - mouse.x) < 25 && Math.abs(place[j].y + 80 - mouse.y) < 25 && money >= growCost) {
                if (place[j].selfGrow == false){
                  place[j].selfGrow = true;
                  place[j].activateGrow = "#339691";
                  money -= growCost;
                  notice = "Growth is On";
                } 
                
            }
            else if  (Math.abs(place[j].x + 15 - mouse.x) < 25 && Math.abs(place[j].y + 80 - mouse.y) < 25 && money <growCost){
                
                    notice = "Not enough Money Growth="+growCost; 
            
            }
        }
    }

      
}

window.addEventListener('mousemove', function (event) {
    mouseH.x = event.x;
    mouseH.y = event.y; 
    update ();
})
window.addEventListener('click', function (event) {
    mouse.x = event.x;
    mouse.y = event.y; 
    update ();
})


//loop
function loop() {
    c.fillStyle = "#964B00";
    c.fillRect(0, 0, cvs.width, cvs.height);
    draw();
    document.getElementById("money").innerHTML = "Money: Rs." + money;
    document.getElementById("pantry").innerHTML = "Eggs :" + pantry;
    requestAnimationFrame(loop);

}
loop();