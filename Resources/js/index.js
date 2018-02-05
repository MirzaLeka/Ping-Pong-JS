
var canvas;
var canvasContext;
var ballX = 400;
var ballY = 300;
var ballSpeedX = 10;
var ballSpeedY = 4;

var leftPaddleScore = 0;
var rightPaddleScore = 0;
const WINNING_SCORE = 10;

var showStartScreen = true;

var showGameOverScreen = false;

var bouncingAudio = new Audio('../Resources/audio/bouncingBall.mp3');

var gameOverPlayer = new Audio('../Resources/audio/gameOverPlayer.mp3');

var gameOverComputer = new Audio('../Resources/audio/gameOverComputer.mp3');

var pointPlayer = new Audio('../Resources/audio/pointPlayer.mp3');

var pointComputer = new Audio('../Resources/audio/pointComputer.mp3');

    pointPlayer.volume = 0.5;	
	pointComputer.volume = 0.3;	

var leftPaddle = 250;
var rightPaddle = 250;
const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;

function calculateMousePos(evt) {

	/* If you're at startup screen you can't move the paddle */
	if (showStartScreen) {
		return;
	}

	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x:mouseX,
		y:mouseY
	};
}

function handleMouseClick(evt) {
	if(showGameOverScreen || showStartScreen) {
		leftPaddleScore = 0;
		rightPaddleScore = 0;
		showGameOverScreen = false;
		showStartScreen = false;
	}
}

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	var framesPerSecond = 30;
	setInterval(function() {
			motion();
			graphics();	
		}, 1000/framesPerSecond);

	canvas.addEventListener('mousedown', handleMouseClick);

	canvas.addEventListener('mousemove',
		function(evt) {
			var mousePos = calculateMousePos(evt);
			leftPaddle = mousePos.y - (PADDLE_HEIGHT/2);
		});
}

function ballReset() {
	
	if(leftPaddleScore >= WINNING_SCORE ||
		rightPaddleScore >= WINNING_SCORE) {

		showGameOverScreen = true;
		
		if (leftPaddleScore >= WINNING_SCORE) {
			gameOverPlayer.play();
		}
		else if (rightPaddleScore >= WINNING_SCORE) {
			gameOverComputer.play();
		}


	}

    /* After reset ball spawn will be random */
	ballSpeedX = -ballSpeedX * Math.ceil(Math.random());
	ballX = canvas.width/2;
	ballY = canvas.height/2;
}


function computerMovement() {
	var rightPaddleCenter = rightPaddle + (PADDLE_HEIGHT/2);

	if (ballX < canvas.width/2 - 50) {
		/* If ball isn't in computer's half, computer should not move,
		  except if ball is near the edge, so computer can see the ball coming  */
	} else {
		if(rightPaddleCenter < ballY - 30) {
		rightPaddle += 8;
	} else if(rightPaddleCenter > ballY + 30) {
		rightPaddle -= 8;
	  }
	}

}

function motion() {

	/* If any of these is active there will be no ball or computer motion */
	if (showStartScreen || showGameOverScreen) {
		return;
	}

	computerMovement();

	ballX = ballX + ballSpeedX;
	ballY = ballY + ballSpeedY;

	/* X Direction */

	/* If Computer Scores */
	
	if(ballX < 0) {
		if(ballY > leftPaddle &&
			ballY < leftPaddle+PADDLE_HEIGHT) {
			ballSpeedX = -ballSpeedX;

			var deltaY = ballY
					-(leftPaddle+PADDLE_HEIGHT/2);
			ballSpeedY = deltaY * 0.35;
			bouncingAudio.play();
		} else {
			rightPaddleScore++;

			if (rightPaddleScore == WINNING_SCORE) {
			}
			else {
              pointComputer.play();
			}

			ballReset();
	
	if (rightPaddleScore == leftPaddleScore + 1) {
	whoScored("Computer Leads", "#D50000");
	}

		}
	}

    /* If Player Scores */

	if(ballX > canvas.width) {
		if(ballY > rightPaddle &&
			ballY < rightPaddle+PADDLE_HEIGHT) {
			ballSpeedX = -ballSpeedX;

			var deltaY = ballY
					-(rightPaddle+PADDLE_HEIGHT/2);
			ballSpeedY = deltaY * 0.35;
				bouncingAudio.play();
		} else {
			leftPaddleScore++;

			if (leftPaddleScore == WINNING_SCORE) {
			}
			else {
              pointPlayer.play();
			  
			}
			ballReset();	

	 if (leftPaddleScore == rightPaddleScore + 1) {
	whoScored("Player Leads", "#007BFF");
	}	

		}
	}

    /* Y Direction */
		
	if(ballY < 0) {
		ballSpeedY = -ballSpeedY;
			bouncingAudio.play();
	}
	if(ballY > canvas.height) {
		ballSpeedY = -ballSpeedY;
			bouncingAudio.play();
	}
}

function drawNet() {
	
var offsetTop = 0;

for (var i = 0; i < 11; i++) {

    createCanvas(394,offsetTop,6,40,'white');
    offsetTop+=80;
}

}

function graphics() {
	
	/* Background Canvas */   
	createCanvas(0,0,canvas.width,canvas.height,'black');

	/* If this is active then elements like net, paddles, ball and score will not be drawn on the screen */
	if (showStartScreen) {
		gameOverScreen("Click to Start", canvas.width/2-70, canvas.height/2,"#FFF","24px Arial");
	}

	else if(showGameOverScreen) {

		if(leftPaddleScore >= WINNING_SCORE) {
			gameOverScreen("Player Won", canvas.width/2-70, canvas.height/2,"#007BFF","24px Arial");
		} else if(rightPaddleScore >= WINNING_SCORE) {
			gameOverScreen("Computer Won", canvas.width/2-80, canvas.height/2,"#D50000","24px Arial");
		}

		gameOverScreen("Click to Restart", 625, 575, "#FFF", "18px Arial");
		return;
	}

	else {

/* Net */
	drawNet();

	/* Left Paddle */
	createCanvas(0,leftPaddle,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');

	/* Right Paddle */
	createCanvas(canvas.width-PADDLE_THICKNESS,rightPaddle,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');

	/* Ball */
	createBall(ballX, ballY, 10, 'white');

    /* Scores */
	scores(leftPaddleScore, canvas.width/2-100, 100, "#007BFF");
	scores(rightPaddleScore, canvas.width/2+77, 100, "#D50000");

	}

}

function createBall(centerX, centerY, radius, color) {
	canvasContext.fillStyle = color;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0,Math.PI*2,true);
	canvasContext.fill();
}

function createCanvas(leftX,topY, width,height, color) {
	canvasContext.fillStyle = color;
	canvasContext.fillRect(leftX,topY, width,height);
}

function scores(paddle, positionX, positionY, color) {
canvasContext.fillStyle = color;
canvasContext.font="30px Arial";
canvasContext.fillText(paddle, positionX, positionY);
}

function gameOverScreen(paddle, positionX, positionY, color, font){

canvasContext.fillStyle = color;
canvasContext.font= font;
canvasContext.fillText(paddle, positionX, positionY);

}

function whoScored(playerScored, color) {
    var x = document.getElementById("snackbar");

if (rightPaddleScore == WINNING_SCORE || leftPaddleScore == WINNING_SCORE) {
	x.className = "hide";
}
else {
	x.className = "show";
}
	x.style.backgroundColor = color;
	document.getElementById("snackbar").innerHTML = playerScored;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
