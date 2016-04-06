var Game = function (cardsboardName, gameresultName, matchInforName, clickinforName, finialClickName) {
    //firstcard index
    var firstcard = -1;
    //secondcard index
    var secondcard = -1;
    //current clickcout
    var clickCount = 0;
    //first time pick up a card flag
    var firstchoose = true;

    //view cards Board element
    var elemtCardsBoard = cardsboardName;
    //view game Result element
    var elemtGameResult = gameresultName;
    //view match infor element
    var elemtMatchInfor = matchInforName;
    //view match infor element
    var elemtClickInfor = clickinforName;
    //view finial click element
    var elemFinialClickInfor = finialClickName;

    // card object array
    this.cards = [];
    //total click count number
    this.totalClickCount = 0;
    //total match count number
    this.matchCount = 0;

    //initial mathod
    this.initial = function (img, imgArray) {

        this.resetGame();
        this.cards = this.CreateCards(img, imgArray);
        return true;

    };

    //create a new card array
    this.CreateCards = function (backImg, frontImgs) {

        var tempCards;
        // create cards
        tempCards = new CardFactory(backImg, frontImgs);
        // suffle the cards
        tempCards = this.sufferCards(tempCards);

        return tempCards;
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

    //add cards to view and bind onclick event
    this.addElement = function () {

        var i,
            j,
            self = this;

        for (i = 0, j = 1; i < this.cards.length; i++, j++) {
            var elem = document.createElement("img");
            elem.className = "col-lg-2 col-md-2 col-sm-3 col-xs-3";
            elem.setAttribute("src", this.cards[i].cardBackImg);
            elem.setAttribute("alt", "Card-" + j);
            var elemId = this.cards[i].id;
            elem.setAttribute("id", elemId);

            var node = document.getElementById(elemtCardsBoard);
            node.appendChild(elem);
            document.getElementById(elemId).addEventListener("click", function (e) {
                self.updateClickInfor(elemtClickInfor);
                self.chooseCard(e, self.cards);
            });
        }
        return true;
    };

    //choose card mathod
    //check wether open more then 2 cards
    //save first open card index, open it
    //save second open card index, open it, and march with first card
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
                    this.matchCard();
                    return true;
                }
            }
        }
    };

    //compare with two cards value
    this.matchCard = function () {
        var self = this;

        if (this.cards[secondcard].cardValue === this.cards[firstcard].cardValue) {
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
        this.cards[secondcard].isMatched = true;
        this.cards[firstcard].isMatched = true;
        this.cards[secondcard].isOpened = true;
        this.cards[firstcard].isOpened = true;
        this.resetMemory();
        if (this.updateMatchCount() === 6) {
            this.endGame();
        }
    };

    this.setNotMatched = function () {
        this.cards[secondcard].isMatched = false;
        this.cards[firstcard].isMatched = false;
        this.cards[firstcard].flipSelf();
        this.cards[secondcard].flipSelf();
        this.cards[secondcard].isOpened = false;
        this.cards[firstcard].isOpened = false;
        this.resetMemory();
    };

    //remove cards 
    this.removeElement = function () {
        var elem = document.getElementById(elemtCardsBoard);
        while (elem.hasChildNodes()) {
            elem.removeChild(elem.lastChild);
        }
    };

    //reset saved information
    this.resetMemory = function () {
        firstcard = -1;
        secondcard = -1;
        clickCount = 0;
        firstchoose = true;
    };

    //update view total click count information
    this.updateClickInfor = function (inforName) {
        this.totalClickCount++;
        document.getElementById(inforName).innerHTML = String(this.totalClickCount);
        return this.totalClickCount;
    };

    //update view match count information
    this.updateMatchCount = function () {
        this.matchCount++;
        document.getElementById(elemtMatchInfor).innerHTML = String(this.matchCount);
        return this.matchCount;
    };

    //end the game
    this.endGame = function () {
        this.removeElement();
        document.getElementById(elemFinialClickInfor).innerHTML = this.totalClickCount;
        if (document.getElementById(elemtGameResult).classList.contains("hidden")) {
            document.getElementById(elemtGameResult).classList.remove("hidden");
            document.getElementById(elemtGameResult).classList.add("show");
        }
        this.cards = [];
        this.totalClickCount = 0;
        this.matchCount = 0;
        return true;
    };

    //reset the game
    this.resetGame = function () {
        this.removeElement();
        if (document.getElementById(elemtGameResult).classList.contains("show")) {
            document.getElementById(elemtGameResult).classList.remove("show");
            document.getElementById(elemtGameResult).classList.add("hidden");
        }
        this.resetMemory();
        this.cards = [];
        this.totalClickCount = 0;
        this.matchCount = 0;
        return true;
    };
};