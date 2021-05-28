//to add coop
var place = [];

function addCoop() {
    if (money >= coopCost) {
        if (screen==1){
            place.push(new coop(++coopCounter0));
        }
        else if (screen==2){
            place.push(new coop(++coopCounter1));
        }
        
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

            if (place[j].occupied === 0 && place[j].screen==screen) {

                chick.push(new chicken(place[j].coopNo));
                money -= chickenCost;
                place[j].occupied = 1;
                notice = "A Chicken Egg is owned" 
                break;
            }
        }
    }

    else {
        notice = "Not Enough Money";
    }

    
}
function home (){
    screen=0;
}