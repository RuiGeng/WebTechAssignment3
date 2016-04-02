function Game() {

    var firstcard = -1;
    var secondcard = -1;
    var clickCount = 0;
    var firstchoose = true;

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
    // card object array
    var cards = [];

    var self = this;

    this.initial = function () {
        this.resetMemory();
        self.cards = this.CreateCards(backImg, cardImgs, cards);
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
        for (i = 0, j = 1; i < cards.length; i++, j++) {
            var elem = document.createElement("img");
            elem.className = "col-lg-2 col-md-2 col-sm-3 col-xs-3";
            elem.setAttribute("src", cards[i].cardBackImg);
            elem.setAttribute("alt", "Card-" + j);
            var elemId = cards[i].id;
            elem.setAttribute("id", elemId);

            var node = document.getElementById(nodeName);
            node.appendChild(elem);
            document.getElementById(elemId).addEventListener("click", function (e) {
                updateClickCount();
                self.chooseCard(e, self.cards)
            });
        }
    };

    this.removeElement = function (nodeName) {
        var elem = document.getElementById(nodeName);
        while (elem.hasChildNodes()) {
            elem.removeChild(elem.lastChild);
        }
    };

    this.chooseCard = function (evnent, cardsArray) {
        var i;
        if (clickCount >= 2) {
            return false;
        }
        for (i = 0; i < cardsArray.length; i++) {
            var card = cardsArray[i];
            if ((card.id === evnent.target.id) && (card.isOpened !== true) && (card.isMatched !== true)) {
                clickCount++;
                if (firstchoose) {
                    firstcard = i;
                    firstchoose = false;
                    card.isOpened = true;
                    card.flipSelf();
                    return true;
                } else {
                    secondcard = i;
                    card.isOpened = true;
                    card.flipSelf();
                    self.matchCard();
                    return true;
                }
            }
        }
    };

    this.matchCard = function () {
        if (cards[secondcard].cardValue === cards[firstcard].cardValue) {
            this.setMatched();
            return true;
        } else {
            setTimeout(this.setNotMatched, 1000);
            return false;
        }
    };

    this.setMatched = function () {
        cards[secondcard].isMatched = true;
        cards[firstcard].isMatched = true;
        cards[secondcard].isOpened = true;
        cards[firstcard].isOpened = true;
        updateMatchCount();
        self.resetMemory();
    };

    this.setNotMatched = function () {
        cards[secondcard].isMatched = false;
        cards[firstcard].isMatched = false;
        cards[firstcard].flipSelf();
        cards[secondcard].flipSelf();
        cards[secondcard].isOpened = false;
        cards[firstcard].isOpened = false;
        self.resetMemory();
    };

    this.resetMemory = function () {
        firstcard = -1;
        secondcard = -1;
        clickCount = 0;
        firstchoose = true;
    };
}