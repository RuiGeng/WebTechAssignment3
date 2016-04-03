var Game = function () {
    this.firstcard = -1;
    this.secondcard = -1;
    this.clickCount = 0;
    this.firstchoose = true;
    this.main;

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
        this.resetMemory();
        this.cards = this.CreateCards(this.backImg, this.cardImgs, this.cards);
    };

    //create a new card array
    this.CreateCards = function (backImg, frontImgs, cards) {
        // create cards
        cards = new CardFactory(backImg, frontImgs);

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
        var self = this;

        for (i = 0, j = 1; i < this.cards.length; i++, j++) {
            var elem = document.createElement("img");
            elem.className = "col-lg-2 col-md-2 col-sm-3 col-xs-3";
            elem.setAttribute("src", this.cards[i].cardBackImg);
            elem.setAttribute("alt", "Card-" + j);
            var elemId = this.cards[i].id;
            elem.setAttribute("id", elemId);

            var node = document.getElementById(nodeName);
            node.appendChild(elem);
            document.getElementById(elemId).addEventListener("click", function (e) {
                self.main.updateClickCount();
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
        if (this.clickCount >= 2) {
            return false;
        }
        for (i = 0; i < cardsArray.length; i++) {
            var card = cardsArray[i];
            if ((card.id === evnent.target.id) && (card.isOpened !== true) && (card.isMatched !== true)) {
                this.clickCount++;
                if (this.firstchoose) {
                    this.firstcard = i;
                    this.firstchoose = false;
                    card.isOpened = true;
                    card.flipSelf();
                    return true;
                } else {
                    this.secondcard = i;
                    card.isOpened = true;
                    card.flipSelf();
                    this.matchCard();
                    return true;
                }
            }
        }
    };

    this.matchCard = function () {
        var self = this;

        if (this.cards[this.secondcard].cardValue === this.cards[this.firstcard].cardValue) {
            this.setMatched();
            return true;
        } else {
            setTimeout(function () {
                self.setNotMatched();
            }, 1000);
            return false;
        }
    };

    this.setMatched = function () {
        this.cards[this.secondcard].isMatched = true;
        this.cards[this.firstcard].isMatched = true;
        this.cards[this.secondcard].isOpened = true;
        this.cards[this.firstcard].isOpened = true;
        this.main.updateMatchCount();
        this.resetMemory();
    };

    this.setNotMatched = function () {
        this.cards[this.secondcard].isMatched = false;
        this.cards[this.firstcard].isMatched = false;
        this.cards[this.firstcard].flipSelf();
        this.cards[this.secondcard].flipSelf();
        this.cards[this.secondcard].isOpened = false;
        this.cards[this.firstcard].isOpened = false;
        this.resetMemory();
    };

    this.resetMemory = function () {
        this.firstcard = -1;
        this.secondcard = -1;
        this.clickCount = 0;
        this.firstchoose = true;
    };
}