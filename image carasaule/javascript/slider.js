var i;
var Slider= function(){
    var l;
    var dots=[];
    var dotsContainer= document.getElementById("dotsContainer");
    this.iteration= document.getElementsByTagName("img").length;
    
    
    // for (var y=0; y<this.iteration; y++){

    //     var dot= document.createElement("span");
    //     dot.classList.add("dots");
    //     dot.setAttribute("id", y);
    //     dot.setAttribute("onclick", "dot");
    //     dotsContainer.append(dot);
    //     dots.push(dot);

    // }

    for (var y=0; y<this.iteration; y++){

        var dot= document.createElement("input");
        dot.classList.add("dots");
        dot.setAttribute("type", "radio");
        dot.setAttribute("name", "radio-btn");
        dot.setAttribute ("id",y)
        dotsContainer.append(dot);
        dots.push(dot);

    }

    i=1;
   
    self=this;
    this.sliding= function(){
        
        if (i >= self.iteration){
            i=0;
        }
        else if (i<0){
            i=self.iteration;
        }

        l=-100*i;

        document.getElementById("carousel").style.marginLeft= (l+50)+"%";
        
        setTimeout(function(){

            document.getElementById("carousel").style.marginLeft= l+"%";
            
            document.getElementById(i-1).checked= true;

        }, 250);
        i++; 
    };

    this.left= function(){
        clearInterval(myInterval);
      
        --i;
       
        if (i >= self.iteration){
            i=0;
        }
        else if (i<0){
            i=self.iteration;
        }
        l=-100*i;
        document.getElementById("carousel").style.marginLeft= (l-50)+"%";
        
        setTimeout(function(){

            document.getElementById("carousel").style.marginLeft= l+"%";
            

        }, 100);
        myInterval=setInterval(self.sliding,3000);
    };

    this.right= function(){
        clearInterval(myInterval);
        
        ++i;
        
        if (i >= self.iteration){
            i=0;
        }
        else if (i<0){
            i=self.iteration;
        }
        l=-100*i;
        document.getElementById("carousel").style.marginLeft= (l-50)+"%";
        
        setTimeout(function(){

            document.getElementById("carousel").style.marginLeft= l+"%";
           

        }, 100);
        myInterval=setInterval(self.sliding,3000);
    };

};

var slider1= new Slider();
document.getElementById("leftArrow").addEventListener("click", slider1.left);
document.getElementById("rightArrow").addEventListener("click", slider1.right);
myInterval= setInterval(slider1.sliding, 3000);





  