var totalTime = 0;
var matchCount = 0;
var clickCount = 0;
var timeHandler;

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
    document.getElementById("matchinfor").innerHTML = String(window.matchCount);
    document.getElementById("clickinfor").innerHTML = String(window.clickCount);
}

function updateMatchCount() {
    window.matchCount++;
    document.getElementById("matchinfor").innerHTML = String(window.matchCount);

}

function updateClickCount() {
    window.clickCount++;
    document.getElementById("clickinfor").innerHTML = String(window.clickCount);
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
    document.getElementById("seconds").innerHTML = pad(window.totalTime % 60);
    document.getElementById("minutes").innerHTML = pad(parseInt(window.totalTime / 60));
}

function startGame() {
    var game = new Game();
    game.initial();
    game.removeElement("cardsboard");
    game.addElement("cardsboard");
}