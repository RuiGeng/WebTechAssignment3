//card front img array 
var cardImgs = [["./imgs/Poker-A.png", "./imgs/Poker-A.png"],
                ["./imgs/Poker-2.png", "./imgs/Poker-2.png"],
                ["./imgs/Poker-3.png", "./imgs/Poker-3.png"],
                ["./imgs/Poker-4.png", "./imgs/Poker-4.png"],
                ["./imgs/Poker-5.png", "./imgs/Poker-5.png"],
                ["./imgs/Poker-6.png", "./imgs/Poker-6.png"]
               ];
//card back img
var backImg = "./imgs/back.png";

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('start').onclick = function () {
        Main.reSet();
        Main.startGame();
    };
});

var Main = {
    //total paly time
    totalTime: 0,
    minutes: 0,
    seconds: 0,
    //game object instance
    game: null,
    timeHandler: null,

    //reset time and timehanlder
    reSet: function () {

        this.totalTime = 0;
        this.minutes = 0;
        this.seconds = 0;

        if (this.timeHandler) {
            clearInterval(this.timeHandler);
        }
    },

    //update the html element, and if the game end then clean the timehanlder
    updateHtml: function () {

        //game end
        if (document.getElementById("gameresult").classList.contains("show")) {
            clearInterval(this.timeHandler);
        } else {
            document.getElementById("seconds").innerHTML = this.seconds;
            document.getElementById("minutes").innerHTML = this.minutes;
            document.getElementById("fseconds").innerHTML = this.seconds;
            document.getElementById("fminutes").innerHTML = this.minutes;
        }
    },

    //format minutes and seconds
    pad: function (val) {

        var valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }

    },

    //timer
    timer: function () {

        this.totalTime++;
        this.minutes = this.pad(parseInt(this.totalTime / 60));
        this.seconds = this.pad(this.totalTime % 60);
        this.updateHtml();

    },

    //create a new game and initial it
    startGame: function () {
        var that = this;

        this.timeHandler = setInterval(function () {
            that.timer();
        }, 1000);


        game = new Game("cardsboard", "gameresult", "matchinfor", "clickinfor", "fclick");
        game.initial(window.backImg, window.cardImgs);
        game.addElement();
    }
};