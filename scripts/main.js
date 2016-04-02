var totalTime = 0;
var matchCount = 0;
var clickCount = 0;
var timeHandler;
var minutes;
var seconds;
var game;

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('start').onclick = function () {
        reStart();
        timeHandler = setInterval(timer, 1000);
        startGame();
    };
});

function reStart() {
    window.totalTime = 0;
    window.matchCount = 0;
    window.clickCount = 0;
    if (timeHandler) {
        clearInterval(timeHandler);
    }
    updateHtml();
}

function updateMatchCount() {
    window.matchCount++;
    updateHtml();
    if (matchCount == 6) {
        endGame();
    }
}

function updateClickCount() {
    window.clickCount++;
    updateHtml();
}

function updateHtml() {
    document.getElementById("matchinfor").innerHTML = String(window.matchCount);
    document.getElementById("clickinfor").innerHTML = String(window.clickCount);
    if (document.getElementById("gameresult").classList.contains("show")) {
        document.getElementById("gameresult").classList.remove("show");
        document.getElementById("gameresult").classList.add("hidden");
    }
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

function timer() {
    window.totalTime++;
    window.minutes = pad(parseInt(window.totalTime / 60));
    window.seconds = pad(window.totalTime % 60);
    document.getElementById("seconds").innerHTML = window.seconds;
    document.getElementById("minutes").innerHTML = window.minutes;
}

function startGame() {
    window.game = new Game();
    window.game.initial();
    window.game.removeElement("cardsboard");
    window.game.addElement("cardsboard");
}

function endGame() {
    clearInterval(timeHandler);
    window.game.removeElement("cardsboard");
    document.getElementById("fseconds").innerHTML = window.seconds;
    document.getElementById("fminutes").innerHTML = window.minutes;
    document.getElementById("fclick").innerHTML = window.clickCount;
    if (document.getElementById("gameresult").classList.contains("hidden")) {
        document.getElementById("gameresult").classList.remove("hidden");
        document.getElementById("gameresult").classList.add("show");
    }
}