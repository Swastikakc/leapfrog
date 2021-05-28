
//to sell egg
function sell() {
    if (pantry > 0) {
        pantry--;
        if (screen==1){
            money += eggCost1;
        }
        else if (screen==2){
            money+=eggCost2;
        }

        notice = "Egg Was Sold"
    }
    else{
        notice = "No Eggs to Sell"
    }
}


// to grow
setInterval(function () {

    for (var j = 0; j < chick.length; j++) {
        if (chick[j].frame < 2) {
            chick[j].feed = true;
            notice= "Feed Chicken";
            eggLaySound.play();

        }


    }

}, Math.random() * 100 + 5000)

// to lay egg
setInterval(function () {

    for (var j = 0; j < chick.length; j++) {
        if (chick[j].frame == 2) {
            if (Math.random() - 0.6 < 0) {
                chick[j].egg++;
                eggLaySound.play();
                notice = "Collect the eggs";
            }
        }


    }

}, Math.random() * 100 + 10000)

// to collect egg and grow
setInterval(function () {

    for (var j = 0; j < chick.length; j++) {
        for (var u = 0; u < place.length; u++) {
            if (place[u].screen == chick[j].screen){
                if (place[u].coopNo == chick[j].coopNo) {
                    if (chick[j].frame == 2 && place[u].selfCollect == true) {
                        chick[j].eggCollect();
                        
                    }
                    if (chick[j].frame < 2 && place[u].selfGrow == true) {
                        chick[j].feedChicken();
                       
                    }
                }
            }
            
        }

    }

}, Math.random() * 100 + 8000)


// to kill a chicken
setInterval(function () {

    for (var j = 0; j < chick.length; j++) {
        if (chick[j].frame == 2) {
            if (Math.random() - 0.2 < 0) {
                for (var u = 0; u < chick.length; u++) {
                    if (chick[j].coopNo == place[u].coopNo && chick[j].screen==place[u].screen) {
                        chick = chick.slice(0, j).concat(chick.slice(j + 1, chick.length));
                        deadSound.play();
                        place[u].occupied = 0;
                        notice = "Chick died of flu"
                    }
                }


            }
        }


    }

}, Math.random() * 100 + 90000)







// //loop
// function loop() {
//     c.fillStyle = "#964B00";
//     c.fillRect(0, 0, cvs.width, cvs.height);
//     draw();
//     document.getElementById("money").innerHTML = "Money: Rs." + money;
//     document.getElementById("pantry").innerHTML = "Eggs :" + pantry;
//     requestAnimationFrame(loop);
// }
// loop();