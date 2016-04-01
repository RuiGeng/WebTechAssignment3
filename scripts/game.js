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

    this.CreateCards = function (backImg, frontImgs, cards) {
        // create cards
        cards = cardFactory(backImg, frontImgs, cards);

        // suffle the cards
        cards = this.sufferCards(cards);

        return cards;
    };

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





}