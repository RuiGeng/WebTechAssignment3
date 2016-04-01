var totalTime = 0;
var matchCount = 0;
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('start').onclick = function () {
        setInterval(timer, 1000);
        startGame();
    };

});


function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}

function timer() {
    totalTime++;
    document.getElementById("seconds").innerHTML = pad(totalTime % 60);
    document.getElementById("minutes").innerHTML = pad(parseInt(totalTime / 60));
}

function startGame() {
    var game = new Game();
    game.initial();
    game.addElement("cardsboard");
}