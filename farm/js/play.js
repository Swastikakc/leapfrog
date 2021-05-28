
//to sell egg
function sell() {
    if (pantry > 0) {
        
        if (screen==1 && egg0 > 0){
            money += eggCost1;
            egg0--;
            pantry--;
            notice = "Egg Was Sold"
            coin.play();
        }
        else if (screen==2 && egg1 > 0){
            money+=eggCost2;
            egg1--;
            pantry--;
            notice = "Egg Was Sold"
            coin.play();
        }
    }
    else{
        notice = "No Eggs to Sell"
    }
        if (egg0Sell==true && egg0 > 0){
            egg0--;
            egg0Sell = false;
            money += eggCost1;
            pantry--;
            notice = "Egg Was Sold"
            coin.play();
        }
        else if (egg1Sell==true && egg1 > 0){
            egg1--;
            egg1Sell = false;
            money += eggCost2;
            pantry--;
            notice = "Egg Was Sold"
            coin.play();
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

setInterval(function(){
    amb.play();
},1000)