// alert("running external JS code!")

//Event Listeners
document.querySelector("#guessBtn").addEventListener("click", checkGuess);
document.querySelector("#resetBtn").addEventListener("click", initializeGame);

//Global variables
let randomNumber;
let attempts = 0;
let wins = 0;
let losses = 0;
const maxAttempts = 7;

initializeGame();

function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("randomNumber: " + randomNumber);
    attempts = 0;

    //hiding the reset button and showing the Guess button
    document.querySelector("#resetBtn").style.display = "none";
    document.querySelector("#guessBtn").style.display = "inline";

    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.focus(); //adding focus to the textbox
    playerGuess.value = ""; //clearing the textbox

    let feedback = document.querySelector("#feedback");
    feedback.textContent = ""; //clearing the feedback

    //clearing previous guesses
    document.querySelector("#guesses").textContent = "";

    updateAttemptsLeft();
}

// document.querySelector("h1").style.color="red";

function checkGuess() {
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "";
    let guessBox = document.querySelector("#playerGuess");
    let guess = Number(guessBox.value);
    console.log("Player guess: " + guess);

    if (isNaN(guess) || guess < 1 || guess > 99) {
        feedback.textContent = "Enter a number between 1 and 99";
        feedback.style.color = "#ff5555";
        return;
    }
    attempts++;
    console.log("Attempts:" + attempts);
    updateAttemptsLeft();
    feedback.style.color = "orange";

    if (guess == randomNumber) {
        feedback.textContent = "You guessed it! You Won in " + attempts + " attempts!";
        feedback.style.color = "#00FF00";
        wins++;
        gameOver();
    } else {
        document.querySelector("#guesses").textContent += guess + " ";
        if (attempts == maxAttempts) {
            feedback.textContent = "Sorry, you lost! The number was " + randomNumber + ".";
            feedback.style.color = "red";
            losses++;
            gameOver();
        } else if (guess > randomNumber) {
            feedback.textContent = "Guess was high";
        } else {
            feedback.textContent = "Guess was low";
        }
    }

    //clear the box for the next guess
    guessBox.value = "";
    guessBox.focus();
}

function updateAttemptsLeft() {
    document.querySelector("#attemptsLeft").textContent = maxAttempts - attempts;
}

function updateStats() {
    document.querySelector("#wins").textContent = wins;
    document.querySelector("#losses").textContent = losses;
}

function gameOver() {
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    guessBtn.style.display = "none";
    resetBtn.style.display = "inline";
    updateStats();
}