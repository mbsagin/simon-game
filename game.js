var gamePattern = new Array;
var userClickedPattern = new Array;

var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var start = false;

$(document).keypress(function () {
	if (!start) {
		$("#level-title").text("Level " + level);
		nextSequence();
		start = true;
	}
});

$(".btn").click(function () {
	var userChosenColor = $(this).attr("id");
	userClickedPattern.push(userChosenColor);

	playSound(userChosenColor);
	animatePress(userChosenColor);

	checkAnswer(userClickedPattern.length - 1);
});


function checkAnswer(currentLevel) {
	if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
		console.log("SUCCESS");

		if (userClickedPattern.length === gamePattern.length) {
			setTimeout(function () {
				nextSequence();
			}, 1000);
		}
	} else {
		console.log("WRONG");
		playSound("wrong");
		$("body").addClass("game-over");
		setTimeout(function() {
			$("body").removeClass("game-over");
		}, 200);
		$("h1").text("Game Over! Press any key to Restart!");
		startOver();
	}
}

function startOver() {
	level = 0;
	gamePattern = [];
	start = false;
}

function nextSequence() {
	userClickedPattern = [];

	level++;
	$("#level-title").text("Level " + level);

	var randomNumber = Math.random();
	randomNumber = randomNumber * 4;
	randomNumber = Math.floor(randomNumber);

	var randomChosenColor = buttonColors[randomNumber];

	gamePattern.push(randomChosenColor);
	$("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

	playSound(randomChosenColor);
}

function playSound(name) {
	var audio = new Audio("sounds/" + name + ".mp3");
	audio.play();
}

function animatePress(currentColor) {
	$("#" + currentColor).addClass("pressed");
	setTimeout(function () {
		$("#" + currentColor).removeClass("pressed");
	}, 100);
}
