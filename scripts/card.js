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
};

var CardFactory = function (cardBackImg, cardFrontImgs) {
    var cardsArray = [];
    var id;
    var i;

    //make two same frontImgs cards and make diffrent id 
    //then put into array one time
    for (i = 0; i < cardFrontImgs.length; i++) {
        var firstCardImg = cardFrontImgs[i][0];
        id = "card" + i + "-" + "0";
        var firstCard = new Card(id, firstCardImg, cardBackImg, i);
        cardsArray.push(firstCard);
        var secondCardImg = cardFrontImgs[i][1];
        id = "card" + i + "-" + "1";
        var secondCard = new Card(id, secondCardImg, cardBackImg, i);
        cardsArray.push(secondCard);
    }
    return cardsArray;
};