function Game() {

    //card front img array 
    this.cardImgs = [["./imgs/Poker-A.png", "./imgs/Poker-A.png"],
                ["./imgs/Poker-2.png", "./imgs/Poker-2.png"],
                ["./imgs/Poker-3.png", "./imgs/Poker-3.png"],
                ["./imgs/Poker-4.png", "./imgs/Poker-4.png"],
                ["./imgs/Poker-5.png", "./imgs/Poker-5.png"],
                ["./imgs/Poker-6.png", "./imgs/Poker-6.png"]
               ];
    //card back img
    this.backImg = "./imgs/back.png";
    // card object array
    this.cards = [];

    this.initial = function () {
        this.cards = this.CreateCards(this.backImg, this.cardImgs, this.cards);
    };

    //create a new card array
    this.CreateCards = function (backImg, frontImgs, cards) {
        // create cards
        cards = cardFactory(backImg, frontImgs, cards);

        // suffle the cards
        cards = this.sufferCards(cards);

        return cards;
    };

    //suffer card array
    this.sufferCards = function (cardsArray) {
        var currentIndex = cardsArray.length,
            temporaryValue,
            randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = cardsArray[currentIndex];
            cardsArray[currentIndex] = cardsArray[randomIndex];
            cardsArray[randomIndex] = temporaryValue;
        }
        return cardsArray;
    };

    this.addElement = function (nodeName) {
        // create a new img element 
        var i, j;
        for (i = 0, j = 1; i < this.cards.length; i++, j++) {
            var elem = document.createElement("img");
            elem.className = "col-lg-2 col-md-2 .col-sm-3 col-xs-3";
            elem.setAttribute("src", this.cards[i].cardBackImg);
            elem.setAttribute("alt", "Card-" + j);
            var elemId = this.cards[i].id;
            elem.setAttribute("id", elemId);

            var node = document.getElementById(nodeName);
            node.appendChild(elem);
            document.getElementById(elemId).addEventListener("click", function (e) {});
        }
        return true;
    };

}