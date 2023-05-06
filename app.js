// Getting Prompts and their inputs and buttons
var promptForSec = document.querySelector(".prompt-for-seconds")
var inputForSec = document.querySelector("#input-sec")
var removeSecPrompt = document.querySelector("#remove-sec-prompt")

var promptForMins = document.querySelector(".prompt-for-minutes")
var inputForMins = document.querySelector("#input-mins")
var removeMinsPrompt = document.querySelector("#remove-mins-prompt")

var promptForHrs = document.querySelector(".prompt-for-hours")
var inputForHrs = document.querySelector("#input-hrs")
var removeHrsPrompt = document.querySelector("#remove-hrs-prompt")

// Getting others
var hrsDisplay = document.querySelector("#hrs-display")
var minsDisplay = document.querySelector("#mins-display")
var secDisplay = document.querySelector("#sec-display")

var pauseBtn = document.querySelector("#pause-btn")
var playBtn = document.querySelector("#play-btn")
var resetBtn = document.querySelector("#reset-btn")
var setBtn = document.querySelector("#set-btn")

var timerEndScreen = document.querySelector(".timer-end-screen")
var removeEndScreen = document.querySelector("#remove-end-screen")

pauseBtn.classList.add("remove")

// Input validation
inputForHrs.addEventListener("input", function () {
    if (!/^[0-9]+$/.test(inputForHrs.value)) {
        inputForHrs.value = "";
    }
});
inputForMins.addEventListener("input", function () {
    if (!/^[0-9]+$/.test(inputForMins.value)) {
        inputForMins.value = "";
    }
});
inputForSec.addEventListener("input", function () {
    if (!/^[0-9]+$/.test(inputForSec.value)) {
        inputForSec.value = "";
    }
});

// Get values from inputs using set button
setBtn.addEventListener("click", showPrompt);
var secondsValue;
var minutesValue;
var hoursValue;

function showPrompt() {
    promptForSec.style.display = "flex"
    promptForMins.style.display = "flex"
    promptForHrs.style.display = "flex"
}

// Trying to close prompt by pressing enter


removeSecPrompt.addEventListener("click", removeSecPromptAndGetValue);
removeMinsPrompt.addEventListener("click", removeMinsPromptAndGetValue);
removeHrsPrompt.addEventListener("click", removeHrsPromptAndGetValue);

function removeSecPromptAndGetValue() {
    secondsValue = Number(inputForSec.value)
    secDisplay.innerHTML = secondsValue.toString().padStart(2, "0");
    // console.log("sec --> " + secondsValue)
    promptForSec.style.display = "none"
}

function removeHrsPromptAndGetValue() {
    hoursValue = Number(inputForHrs.value)
    hrsDisplay.innerHTML = hoursValue.toString().padStart(2, "0");
    // console.log("hours --> " + hoursValue)
    promptForHrs.style.display = "none"
}

function removeMinsPromptAndGetValue() {
    minutesValue = Number(inputForMins.value)
    minsDisplay.innerHTML = minutesValue.toString().padStart(2, "0");
    // console.log("minutes --> " + minutesValue)
    promptForMins.style.display = "none"
}

// Updating Timer
var totalSeconds;
var timerStart;

playBtn.addEventListener("click", function () {
    if (isNaN(hoursValue) && isNaN(minutesValue) && isNaN(secondsValue)) {
        alert("Set the timer first")
    } else {
        timerStart = setInterval(updation, 1000);
    }
})

function updation() {


    // Enable pause button and disable play button
    pauseBtn.classList.remove("remove")
    playBtn.classList.add("remove")

    // Calculation
    totalSeconds = hoursValue * 3600 + minutesValue * 60 + Number(secondsValue);


    // Functionality for the end of timer
    if (totalSeconds < 0) {
        clearInterval(timerStart);
        timerEndScreen.style.display = "flex"
        playBtn.classList.remove("remove")
        pauseBtn.classList.add("remove")
    } else {
        // Adding 0 if num < 10
        var hoursStr = hoursValue.toString().padStart(2, "0");
        var minutesStr = minutesValue.toString().padStart(2, "0");
        var secondsStr = secondsValue.toString().padStart(2, "0");

        // Display values
        hrsDisplay.innerHTML = hoursStr
        minsDisplay.innerHTML = minutesStr
        secDisplay.innerHTML = secondsStr

        totalSeconds--;

        hoursValue = Math.floor(totalSeconds / 3600);
        minutesValue = Math.floor((totalSeconds % 3600) / 60);
        secondsValue = totalSeconds % 60;

    }
}

pauseBtn.addEventListener("click", pauseTimer);

function pauseTimer() {
    clearInterval(timerStart);
    playBtn.classList.remove("remove")
    pauseBtn.classList.add("remove")
}

resetBtn.addEventListener("click", resetTimer);

function resetTimer() {
    clearInterval(timerStart)
    playBtn.classList.remove("remove")
    pauseBtn.classList.add("remove")
    totalSeconds = 0;

    hoursValue = undefined;
    minutesValue = undefined;
    secondsValue = undefined;

    hrsDisplay.innerHTML = "00"
    minsDisplay.innerHTML = "00"
    secDisplay.innerHTML = "00"
}

// Remove End Screen
removeEndScreen.addEventListener("click", removingTimerEndScreen);

function removingTimerEndScreen() {
    timerEndScreen.style.display = "none"
    hoursValue = undefined;
    minutesValue = undefined;
    secondsValue = undefined;
}
