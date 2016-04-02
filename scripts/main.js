document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('start').onclick = function () {
        var main = new Main();
        main.startGame();
    };
});

var Main = function () {
    this.totalTime = 0;
    this.matchCount = 0;
    this.clickCount = 0;
    this.minutes = 0;
    this.seconds = 0;
    this.game;
    this.timeHandler;
    var self = this;

    this.reStart = function () {
        this.totalTime = 0;
        this.matchCount = 0;
        this.clickCount = 0;
        if (this.timeHandler) {
            clearInterval(this.timeHandler);
        }
        this.updateHtml();
    };

    this.updateMatchCount = function () {

        this.matchCount++;
        this.updateHtml();
        if (this.matchCount == 6) {
            this.endGame();
        }
    };

    this.updateClickCount = function () {
        this.clickCount++;
        this.updateHtml();
    };

    this.updateHtml = function () {
        document.getElementById("matchinfor").innerHTML = String(this.matchCount);
        document.getElementById("clickinfor").innerHTML = String(this.clickCount);
        if (document.getElementById("gameresult").classList.contains("show")) {
            document.getElementById("gameresult").classList.remove("show");
            document.getElementById("gameresult").classList.add("hidden");
        }
    }

    this.pad = function (val) {
        var valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
    };

    this.timer = function () {
        this.totalTime++;
        this.minutes = this.pad(parseInt(this.totalTime / 60));
        this.seconds = this.pad(this.totalTime % 60);
        document.getElementById("seconds").innerHTML = this.seconds;
        document.getElementById("minutes").innerHTML = this.minutes;
    };

    this.startGame = function () {
        this.reStart();
        var that = this;

        this.timeHandler = setInterval(function () {
            that.timer();
        }, 1000);

        this.game = new Game();
        this.game.initial();
        this.game.main = this;
        this.game.removeElement("cardsboard");
        this.game.addElement("cardsboard");
    };

    this.endGame = function () {
        clearInterval(this.timeHandler);

        this.game.removeElement("cardsboard");
        document.getElementById("fseconds").innerHTML = this.seconds;
        document.getElementById("fminutes").innerHTML = this.minutes;
        document.getElementById("fclick").innerHTML = this.clickCount;
        if (document.getElementById("gameresult").classList.contains("hidden")) {
            document.getElementById("gameresult").classList.remove("hidden");
            document.getElementById("gameresult").classList.add("show");
        }
    };
};