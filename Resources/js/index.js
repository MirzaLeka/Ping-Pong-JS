
var canvas;
var canvasContext;
var ballX = 400;
var ballY = 300;
var ballSpeedX = 10;
var ballSpeedY = 4;

var playerScore = 0;
var computerScore = 0;
const WINNING_SCORE = 11;
const currentVersion = 'v.1.04';

var showStartScreen = true;

var showDifficultyScreen = false;

var showGameOverScreen = false;

var bouncingAudio = new Audio('../Resources/audio/bouncingBall.mp3');

var gameOverPlayer = new Audio('../Resources/audio/gameOverPlayer.mp3');

var gameOverComputer = new Audio('../Resources/audio/gameOverComputer.mp3');

var pointPlayer = new Audio('../Resources/audio/pointPlayer.mp3');

var pointComputer = new Audio('../Resources/audio/pointComputer.mp3');

var buttonClick = new Audio('../Resources/audio/buttonClick.mp3');

    pointPlayer.volume = 0.5;	
	pointComputer.volume = 0.3;	
	buttonClick.volume = 0.75;

var leftPaddle = 250;
var rightPaddle = 250;
const PADDLE_THICKNESS = 10;
const PADDLE_HEIGHT = 100;

//very HARD 20, 40

// Default Difficulty = Medium
let computerSpeed = 10;
let computerOffset = 30;


function calculateMousePos(evt) {

	/* If you're at start screen you can't move the paddle */
	if (showStartScreen) {
		return;
	}

	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;

/* Show Mouse position for X and Y axis

 console.log(`MouseX: ${mouseX.toFixed(3)}
MouseY: ${mouseY.toFixed(3)}`);*/

	return {
		x:mouseX,
		y:mouseY
	};
}

function gameTime(a, b, c) {
	showDifficultyScreen = a;
	showGameOverScreen = b;
	showStartScreen = c;

}

function handleMouseClick(evt) {

	var mousePos = calculateMousePos(evt);

	if (showStartScreen) {
		buttonClick.play();
	    playerScore = 0;
		computerScore = 0;
		gameTime(true, false, false);
	}

	else if (showDifficultyScreen) {

	// Easy Button
	if (mousePos.x >= 336 && mousePos.x <= 483 && mousePos.y >= 203 && mousePos.y <= 233) {
		buttonClick.play();
		computerSpeed = 4;
        computerOffset = 10;
		gameTime(false, false, false);
}

	// Medium button
    else if (mousePos.x >= 336 && mousePos.x <= 483 && mousePos.y >= 285 && mousePos.y <= 315) {
		buttonClick.play();
		 computerSpeed = 10;
         computerOffset = 30;
		gameTime(false, false, false);
}

	// Hard button
    else if (mousePos.x >= 336 && mousePos.x <= 483 && mousePos.y >= 363 && mousePos.y <= 393) {
		buttonClick.play();
		computerSpeed = 17;
		computerOffset = 40;
		gameTime(false, false, false);
	}


	}

	if (showGameOverScreen) {
	    playerScore = 0;
		computerScore = 0;

		// Main Menu Button
	if (mousePos.x >= 515 && mousePos.x <= 635 && mousePos.y >= 555 && mousePos.y <= 585) {
     	buttonClick.play();
		gameTime(false, false, true);
    	stopEndingSound();
	
	}
	    // Restart button
	else if (mousePos.x >= 667 && mousePos.x <= 749 && mousePos.y >= 555 && mousePos.y <= 585) {
		buttonClick.play();
		gameTime(false, false, false);
		stopEndingSound();

	}

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

function stopEndingSound(){

	// Stop winning/losing sound when button is clicked
		gameOverPlayer.pause();
		gameOverPlayer.currentTime = 0;
		gameOverComputer.pause();
		gameOverComputer.currentTime = 0;
}

function ballReset() {
	
	if(playerScore >= WINNING_SCORE ||
		computerScore >= WINNING_SCORE) {

		showGameOverScreen = true;
		
		if (playerScore >= WINNING_SCORE) {
			gameOverPlayer.play();
		}
		else if (computerScore >= WINNING_SCORE) {
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
 
 	/* If ball isn't in computer's half, computer should not move,
	  except if ball is near the edge, so computer can see the ball coming.  */
	if (ballX < canvas.width/2 - 150) {

    /* If computer paddle is not in the middle (250), it will move towards it step by step.
	In other words, it will go towards the middle until it detecteds ball within it's range. */
if (rightPaddle < 250) {
	rightPaddle++;
}
else if (rightPaddle > 250) {
	rightPaddle--;
}

	} else {
		if(rightPaddleCenter < ballY - computerOffset) {
		rightPaddle += computerSpeed;
	} else if(rightPaddleCenter > ballY + computerOffset) {
		rightPaddle -= computerSpeed;
	  }
	}

}

function motion() {

	/* If any of these is active there will be no ball or computer motion */
	if (showStartScreen || showDifficultyScreen || showGameOverScreen) {
		return;
	}

	computerMovement();

	ballX = ballX + ballSpeedX;
	ballY = ballY + ballSpeedY;

	/* X Direction */

	/* If Computer Scores */
	
	if(ballX < 15 && ballY > leftPaddle &&
			ballY < leftPaddle+PADDLE_HEIGHT+10) { // + 15 is here for corner collision bug

			ballSpeedX = -ballSpeedX;

			var deltaY = ballY
					-(leftPaddle+PADDLE_HEIGHT/2);
			ballSpeedY = deltaY * 0.35;
			bouncingAudio.play();

		} else if (ballX < 0) {
			computerScore++;

			if (computerScore == WINNING_SCORE) {
			}
			else {
              pointComputer.play();
			}

			ballReset();
	
	if (computerScore == playerScore + 1) {
	whoScored("Computer Leads", "#D50000");
	}

		}
	

    /* If Player Scores */

	if(ballX > canvas.width-18 && ballY > rightPaddle &&
			ballY < rightPaddle+PADDLE_HEIGHT+10) {

			ballSpeedX = -ballSpeedX;

			var deltaY = ballY
					-(rightPaddle+PADDLE_HEIGHT/2);
			ballSpeedY = deltaY * 0.35;
				bouncingAudio.play();

		} else if (ballX > canvas.width) {
			playerScore++;

			if (playerScore == WINNING_SCORE) {
			}
			else {
              pointPlayer.play();
			  
			}
			ballReset();	

	 if (playerScore == computerScore + 1) {
	whoScored("Player Leads", "#007BFF");
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

    /* Corners - reset ball if it gets stucked */

	if ( (ballX < 0 && ballY < 0) ||  /* (0,0)  */
	(ballX < 0 && ballY > canvas.height) || /* (0,600)  */
	(ballX > canvas.width && ballY < 0) || /* (800,0)  */
	(ballX > canvas.width && ballY > canvas.height) ) /* (800,600)  */ {
    ballReset();	
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

		gameOverScreen(`Ping Pong JS ${currentVersion}`, canvas.width-175, canvas.height/3-150,"#FFF","15px Arial");

		gameOverScreen("Winning is easy, but domination can be tough.", canvas.width/2-160, canvas.height/2-150,"#FFF","15px Arial");
		gameOverScreen("To dominate you must defeat your opponent so badly that he doesn't even score once.", canvas.width/2-290, canvas.height/2-125,"#FFF","15px Arial");

		gameOverScreen("Click to Start", canvas.width/2-70, canvas.height/2,"#FFF","24px Arial");

	}

	else if (showDifficultyScreen) {
		//Easy
        createCanvas(canvas.width/2-70, canvas.height/2-100, 150,30,'#111');
        gameOverScreen("Easy", canvas.width/2-21, canvas.height/2-77,"white","24px Arial");
        //Medium
        createCanvas(canvas.width/2-70, canvas.height/2-20, 150,30,'#111');
        gameOverScreen("Medium", canvas.width/2-37, canvas.height/2+3,"white","24px Arial");
        //Hard
         createCanvas(canvas.width/2-70, canvas.height/2+60, 150,30,'#111');
         gameOverScreen("Hard", canvas.width/2-21, canvas.height/2+83,"white","24px Arial");

}

	else if(showGameOverScreen) {

		if(playerScore >= WINNING_SCORE) {
			if (playerScore >= WINNING_SCORE && computerScore < 1) {
			gameOverScreen("Player Dominated", canvas.width/2-100, canvas.height/2,"#007BFF","24px Arial");
		}
		else {
			gameOverScreen("Player Won", canvas.width/2-70, canvas.height/2,"#007BFF","24px Arial");
		}		
	} 
	
		else if(computerScore >= WINNING_SCORE) {
			if (computerScore >= WINNING_SCORE && playerScore < 1) {
			gameOverScreen("Computer Dominated", canvas.width/2-110, canvas.height/2,"#D50000","24px Arial");
		}
		else {
			gameOverScreen("Computer Won", canvas.width/2-80, canvas.height/2,"#D50000","24px Arial");
		}
	}
	    createCanvas(510, 552, 120,30,'#111');
	    createCanvas(662, 552, 83,30,'#111');
	    gameOverScreen("Main Menu", 525, 575, "#FFF", "18px Arial");
		gameOverScreen("Restart", 675, 575, "#FFF", "18px Arial");
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
	scores(playerScore, canvas.width/2-100, 100, "#007BFF");
	scores(computerScore, canvas.width/2+77, 100, "#D50000");

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

if (computerScore == WINNING_SCORE || playerScore == WINNING_SCORE) {
	x.className = "hide";
}
else {
	x.className = "show";
}
	x.style.backgroundColor = color;
	document.getElementById("snackbar").innerHTML = playerScored;
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}
