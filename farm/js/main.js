chickHouse = [];
chickHouse.push(new house(0, false));
chickHouse.push(new house(1, true));

function draw() {
    
    if (screen == 0) {

        //for sky
        c.fillStyle = "#87ceeb";
        c.fillRect(0, 0, cvs.width, cvs.height);

        //for grass
        c.fillStyle = "#7cfc00";
        c.fillRect(0, cvs.height - 200, cvs.width, 200);
        c.drawImage(bg,0,500,700,400,500,cvs.height - 380,500,400);
        c.drawImage(bg,0,400,160,150,10,50,150,150);
        c.drawImage(bg,420,240,70,50,390,180,150,100);
        c.drawImage(bg,350,240,70,50,730,50,150,100);
        c.drawImage(bg,420,240,70,50,290,100,150,100);
        c.drawImage(bg,420,240,70,50,10,150,150,100);
        c.drawImage(bg,420,240,70,50,890,100,150,100);
        //for 2 house
        chickHouse[0].draw();
        chickHouse[1].draw();
        

        //hide buttons
        coopButton.style.visibility = "hidden";
        chickenButton.style.visibility = "hidden";
        pantryVisible.style.visibility = "hidden";

    } else if (screen !== 0) {
        c.drawImage(back,0,0,cvs.width,cvs.height);

        coopButton.style.visibility = "visible";
        chickenButton.style.visibility = "visible";
        pantryVisible.style.visibility = "visible";

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
        
    }
 
    noticeBoard();
}

function update() {
    if (screen == 0) {
        for (var j = 0; j < chickHouse.length; j++) {
            //on hovering in house increase the house size
            if (Math.abs(chickHouse[j].x + 100 - mouseH.x) < 100 && Math.abs(chickHouse[j].y + 100 - mouseH.y) < 100) {

                chickHouse[j].houseSize.x = 220;
                chickHouse[j].houseSize.y = 220;
                chickHouse[j].hoverText = true;

            } else {
                chickHouse[j].houseSize.x = 200;
                chickHouse[j].houseSize.y = 200;
                chickHouse[j].hoverText = ""
            }

        }
        
        // on click
        if (Math.abs(chickHouse[0].x + 100 - mouse.x) < 100 && Math.abs(chickHouse[0].y + 100 - mouse.y) < 100 && chickHouse[0].locked==false) {
            screen = 1;
            mouse.x = undefined;
            mouse.Y = undefined;
        }
        if (Math.abs(chickHouse[1].x + 100 - mouse.x) < 100 && Math.abs(chickHouse[1].y + 100 - mouse.y) < 100 && chickHouse[1].locked==false) {
            screen = 2;
            mouse.x = undefined;
            mouse.Y = undefined;
        }
        else if (Math.abs(chickHouse[1].x + 100 - mouse.x) < 100 && Math.abs(chickHouse[1].y + 100 - mouse.y) < 100 && chickHouse[1].locked==true) {
            if (money >= 10000){
                chickHouse[1].locked=false;
                money-=10000;
                mouse.x = undefined;
                mouse.Y = undefined;
            }
            
        }
       
        if (Math.abs(chickHouse[0].x + 50- mouse.x) < 100 && Math.abs(chickHouse[0].y +chickHouse[0].h+50 - mouse.y) < 50) {
            
            chickHouse[0].buttonY = 70;
            egg0Sell = true;
            sell();
            mouse.x = undefined;
            mouse.Y = undefined;
        }
        else if (Math.abs(chickHouse[1].x + 50- mouse.x) < 100 && Math.abs(chickHouse[1].y +chickHouse[1].h+50 - mouse.y) < 50){
            chickHouse[1].buttonY = 70;
            egg1Sell = true;
            sell();
            mouse.x = undefined;
            mouse.Y = undefined;
        }
        else {
            chickHouse[0].buttonY = 60;
            chickHouse[1].buttonY = 60;
        }
        document.getElementById("pantry").innerHTML = "Eggs :" + pantry;
    }
    else if (screen !== 0) {
        if (screen ==1){document.getElementById("pantry").innerHTML = "Eggs :" + egg0;}
        else if(screen ==2){document.getElementById("pantry").innerHTML = "Eggs :" + egg1;}
        
        //to grow chicken
        for (var j = 0; j < chick.length; j++) {
            if (chick[j].screen == screen) {
                if (Math.abs(chick[j].x + 50 - mouse.x) < 50 && Math.abs(chick[j].y + 50 - mouse.y) < 50) {
                    chick[j].update();
                    mouse.x = undefined;
                    mouse.y = undefined;
                }
                //when hover
                if (Math.abs(chick[j].x + 50 - mouseH.x) <
                    30 && Math.abs(chick[j].y + 50 - mouseH.y) < 30) {
                    if (chick[j].frame == 2) {
                        chick[j].frame = 3;
                        chickSound.play();
                    }


                } else if (Math.abs(chick[j].x + 50 - mouseH.x) >= 30 || Math.abs(chick[j].y + 50 - mouseH.y) >= 30) {
                    if (chick[j].frame == 3) {
                        chick[j].frame = 2;
                    }
                }
            }




        }


        for (var j = 0; j < place.length; j++) {
            if (place[j].screen == screen) {
                
                // collect automate
                if (Math.abs(place[j].x + 20 - mouse.x) < 25 && Math.abs(place[j].y + 20 - mouse.y) < 25 && money >= collectCost) {
                    
                    if (place[j].selfCollect == false) {
                        place[j].selfCollect = true;
                        place[j].activateCollect = "#339691"
                        money -= collectCost;
                        notice = "Collect is On";
                    }
                } else if (Math.abs(place[j].x + 20 - mouse.x) < 25 && Math.abs(place[j].y + 20 - mouse.y) < 25 && money < collectCost) {

                    notice = "Not enough Money collect=" + collectCost;

                }

                // grow automate
                if (Math.abs(place[j].x + 20 - mouse.x) < 25 && Math.abs(place[j].y + 90 - mouse.y) < 25 && money >= growCost) {
                    if (place[j].selfGrow == false) {
                        place[j].selfGrow = true;
                        place[j].activateGrow = "#339691";
                        money -= growCost;
                        notice = "Growth is On";
                    }

                } else if (Math.abs(place[j].x + 20 - mouse.x) < 25 && Math.abs(place[j].y + 90 - mouse.y) < 25 && money < growCost) {

                    notice = "Not enough Money Growth=" + growCost;

                }
            }


        }
    }

}

window.addEventListener('mousemove', function (event) {
    mouseH.x = event.x;
    mouseH.y = event.y;
    update();
})
window.addEventListener('click', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
    click.play();
    update();
})


//loop
function loop() {
    c.fillStyle = "#964B00";
    c.fillRect(0, 0, cvs.width, cvs.height);
    draw();
    document.getElementById("money").innerHTML = "Money: Rs." + money;

    if (money<50){
        for (var j = 0; j<chick.length; j++){
            if (chick[j].frame>=2){
                adultChicken++;
            }
        }
        if (adultChicken<=0){
            setTimeout(function () {
                location.reload()
            }, 3000);
            c.fillStyle = "#000000";
            c.fillRect(0, 0, cvs.width, cvs.height);
            c.font = " bold 40px Arial";
            c.fillStyle = "#ff0000"
            c.fillText("Game Over", cvs.width/2-100, cvs.height/2);
            notice = "Game Over";
            c.drawImage (dead,cvs.width/2-100, cvs.height/2+50,200,200);
      
            gameOver.play();

        }
    }
    
    requestAnimationFrame(loop);

}
loop();