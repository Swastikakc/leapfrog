//to add coop
var place = [];

function addCoop() {
    if (money >= coopCost) {
        place.push(new coop(++coopCounter));
        money -= coopCost;
        notice = "A New Coop Was Added"
    }
    else {
        notice = "Not Enough Money"
    }

}

//to add chicken
var chick = [];

function addChicken() {

    if (money >= chickenCost) {

        for (var j = 0; j < place.length; j++) {

            if (place[j].occupied === 0) {

                chick.push(new chicken(place[j].coopNo));
                money -= chickenCost;
                place[j].occupied = 1;
                notice = "A Chicken Egg Was Purchased" 
                break;
            }
        }
    }

    else {
        notice = "Not Enough Money";
    }

    
}