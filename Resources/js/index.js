


var canvas = document.getElementById("gameCanvas");
var canvasContext;
var ballX = 50;
var framesPerSecond = 60;

window.onload = function() {

setInterval(function(){ movement(); graphics();} ,framesPerSecond);

}

function movement() {
//   ballX+=5;

}


function graphics() { 
    

 /* Middle Line */   
canvasContext = canvas.getContext("2d");
canvasContext.fillStyle = "white";

var offsetTop = 0;

for (var i = 0; i < 11; i++) {

    canvasContext.fillRect(390,offsetTop,10,40); //positionX, positionY, width, height
    offsetTop+=80;
}

/* Left Paddle */
canvasContext.fillStyle = "white";
canvasContext.fillRect(20, 250, 15, 100);


/* Right Paddle */
canvasContext.fillStyle = "white";
canvasContext.fillRect(765, 250, 15, 100);




}

