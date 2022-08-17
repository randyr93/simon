// declare and initialize variables
const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

// event listener for a click on the screen that will start the game
$("#level-title").click(function() { //problems here, tried using .one method, but this wouldn't allow a restert of the game without a page reload

    // check that the game hasn't already started prior to prevent the game from resetting on a click.
    if(!started) {
        nextSequence();
        $("#level-title").text("Level " + level);
        started = true;
    }
})

// click event listener to store clicked button id into an array
$(".btn").click(function() {

    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    // play sound for clicked button
    playSound(userChosenColor);

    // animate button when pressed
    animatePress(userChosenColor);

    // call checkAnswer
    checkAnswer(userClickedPattern.length - 1);
});

// check to see if user input is correct
function checkAnswer(currentLevel) {

    // if the user clicks the correct button
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        // if the user clicks the last button in the sequence thus far
        if (userClickedPattern.length === gamePattern.length) {

            // call nextSequence to give the user the next button
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    // if the user clicks the wrong button
    } else {

        // play game over sound and turn the background red
        playSound("wrong");
        $("body").addClass("game-over");

        // return background to normal after 200ms
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 200);

        // change title to let user know that the game has ended
        $("#level-title").text("Game over, Click here to restart");

        //call startOver to reset the game
        startOver();
    }
}

// function to randomly choose next color and show the user with a flash of the button chosen
function nextSequence() {

    // update title with current level and reset userClickedPattern
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    // choose a random button
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];

    // add random button to gamePattern array
    gamePattern.push(randomChosenColor);

    // cycle through entire gamePattern for user
    for (let i=0; i<gamePattern.length; i++) {
        setTimeout(function() {
            $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
            playSound(gamePattern[i]);
        }, 500 + (500 * i)); // problem here, had to add the 500 * i to have them show sequentially instead of simultaneously after the code had run through all iterations.
    }
    
    // make chosen button flash
    //$("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    // play sound based on button chosen
    //playSound(randomChosenColor);

}

// generate sound based on button id
function playSound(name) {

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
    
}

// apply pressed class to modify css temporarily when a button is clicked
function animatePress(currentColor) {

    // add pressed class to clicked button
    var activeColor = $("." + currentColor);
    activeColor.addClass("pressed");

    // remove pressed class from clicked button after a 100 ms delay
    setTimeout(function() {
        activeColor.removeClass("pressed");
    }, 100);
    
}

// reset variables to their initial values to start the game over.
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
