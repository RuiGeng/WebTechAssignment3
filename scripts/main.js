document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('start').onclick = function () {
        setInterval(timer, 1000);
        startGame();
    };

});

function startGame() {
    var game = new Game();
    game.initial();
}