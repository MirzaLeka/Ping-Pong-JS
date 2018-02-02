


var canvas = document.getElementById("gameCanvas");
var canvasContext;
var ballX = 50;
var framesPerSecond = 60;

window.onload = function() {

setInterval(function(){ movement(); graphics();} , 1000/framesPerSecond);

}

function movement() {
//   ballX+=5;

}


function graphics() {

    canvasContext = canvas.getContext("2d"); 
    

 /* Middle Line */   

var offsetTop = 0;

for (var i = 0; i < 11; i++) {

    createCanvas(392,offsetTop,8,40,'white');
    offsetTop+=80;
}

/* Left Paddle */
    createCanvas(20,250,15,100,'white');

/* Right Paddle */
createCanvas(765,250,15,100,'white');

/* Ball */
createBall(350, 250, 10, 'white');

}

function createCanvas(positionX, positionY, width, height, color){
canvasContext.fillStyle = color;
canvasContext.fillRect(positionX, positionY, width, height);

}

function createBall(positionX, positionY, radius, color) {
canvasContext.fillStyle = color;
canvasContext.beginPath();
canvasContext.arc(positionX, positionY, radius, 0, Math.PI*2, true);
canvasContext.fill();
}

