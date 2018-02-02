
var canvas = document.getElementById("gameCanvas");
var canvasContext;

var ballX = 50;
var ballSpeedX = -20;

var ballY = 50;
var ballSpeedY = -20;

var framesPerSecond = 60;

var audio = new Audio('../Resources/audio/bouncingBall.mp3');

window.onload = function() {

 canvasContext = canvas.getContext("2d"); 
 /* Background Canvas */    

setInterval(function(){ motion(); graphics();} , 50);


}

function motion() {

/* Motion X Direction */

 ballX = ballX + ballSpeedX;

if (ballX > canvas.width) {
ballSpeedX = -ballSpeedX;
audio.play();
}


if (ballX < 0) {
ballSpeedX = -ballSpeedX;
audio.play();
}


/* Motion Y Direction */

ballY = ballY + ballSpeedY;

if (ballY > canvas.height) {
ballSpeedY = -ballSpeedY;
audio.play();
}

if (ballY < 0) {
ballSpeedY = -ballSpeedY;
audio.play();
}



}

function graphics() {

 

/* Background Canvas */    
canvasContext.fillStyle = "black";
canvasContext.fillRect(0,0, canvas.width, canvas.height);

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
createBall(ballX, ballY, 10, 'red');

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

