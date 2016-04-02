var Card = function (id, cardFrontImg, cardBackImg, value) {
    //card id
    this.id = id;
    //the img path of card front side
    this.cardFrontImg = cardFrontImg;
    //the img path of card back side
    this.cardBackImg = cardBackImg;
    //the value of the card
    this.cardValue = value;
    //flag for card open or close
    this.isOpened = false;
    //flag for card matched or not
    this.isMatched = false;

    //filp function
    //if openned then closed, if closed then open 
    this.flipSelf = function () {
        var image = document.getElementById(this.id);
        if (image.src.match(this.cardBackImg)) {
            image.src = this.cardFrontImg;
            this.isOpened = true;
        } else {
            image.src = this.cardBackImg;
            this.isOpened = false;
        }
    };
}

var CardFactory = function (cardBackImg, cardFrontImgs, cardsArray) {
    this.backImg = cardBackImg;
    this.frontImgs = cardFrontImgs;
    this.id;
    this.i;
    for (this.i = 0; this.i < this.frontImgs.length; this.i++) {
        var firstCardImg = this.frontImgs[this.i][0];
        this.id = "card" + this.i + "-" + "0";
        var firstCard = new Card(this.id, firstCardImg, this.backImg, this.i);
        cardsArray.push(firstCard);
        var secondCardImg = this.frontImgs[this.i][1];
        this.id = "card" + this.i + "-" + "1";
        var secondCard = new Card(this.id, secondCardImg, this.backImg, this.i);
        cardsArray.push(secondCard);
    }
    return cardsArray;
}