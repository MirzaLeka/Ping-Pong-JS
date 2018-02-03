
var canvas = document.getElementById("gameCanvas");
var canvasContext;

var ballX = canvas.width/2;
var ballSpeedX = -20;

var ballY = canvas.height/2;
var ballSpeedY = -20;

var framesPerSecond = 60;

var audio = new Audio('../Resources/audio/bouncingBall.mp3');

var leftPaddle = 250;
var rightPaddle = 250;

const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 15;

var scorePlayer = 0;
var scorePC = 0;



function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	};
}

window.onload = function() {

 canvasContext = canvas.getContext("2d"); 
 /* Background Canvas */    

setInterval(function(){ motion(); graphics();} , 50);


}

function ballReset() {

ballSpeedX = -ballSpeedX;
ballX = canvas.width/2;
ballY = canvas.height/2;

}

function motion() {


/* Motion X Direction */

 ballX = ballX + ballSpeedX;

if (ballX > canvas.width) {
// ballSpeedX = -ballSpeedX;
//audio.play();
ballReset();

/* Player Scores */
scorePlayer++;

}

if (ballX < 0) {
ballReset();

/* PC Scores */
scorePC++;
}


/* Left Paddle Collission */

if (ballX < 50 && ballX > 35 && (ballY > leftPaddle && ballY < (leftPaddle + PADDLE_HEIGHT))) {  // ballX < 50 && > 35; ballY > 250 && < 350; 
ballSpeedX = - ballSpeedX;
//audio.play();

}


/* Motion Y Direction */

ballY = ballY + ballSpeedY;

if (ballY > canvas.height) {
ballSpeedY = -ballSpeedY;
//audio.play();
}

if (ballY < 0) {
ballSpeedY = -ballSpeedY;
//audio.play();
}

canvas.addEventListener('mousemove',
		function(evt) {
			var mousePos = calculateMousePos(evt);
			leftPaddle = mousePos.y - (PADDLE_HEIGHT/2);
            
		});


}

function graphics() {


/* Background Canvas */    
canvasContext.fillStyle = "black";
canvasContext.fillRect(0,0, canvas.width, canvas.height);

 /* Middle Line */   
var offsetTop = 0;

for (var i = 0; i < 11; i++) {

    createCanvas(394,offsetTop,6,40,'white');
    offsetTop+=80;
}

/* Left Paddle */
 createCanvas(20,leftPaddle,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');

/* Right Paddle */
createCanvas(765,rightPaddle,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');

/* Scores */
scores(scorePC, canvas.width/2-PADDLE_HEIGHT, canvas.height/2-canvas.height/4);
scores(scorePlayer, canvas.width/2+PADDLE_HEIGHT, canvas.height/2-canvas.height/4);


/* Ball */
createBall(ballX, ballY, 10, 'white');


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

function scores(team, positionX, positionY) {
canvasContext.fillText(team, positionX, positionY);

}

