function Card(id, cardWidth, cardHeight, cardFrontImg, cardBackImg, value) {
    //card id
    this.id = id;
    //card width
    this.cardWidth = cardWidth;
    //car height
    this.cardHeight = cardHeight;
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


function cardFactory(cardBackImg, cardFrontImgs, cardsArray) {
    var backImg = cardBackImg;
    var frontImg;
    var id;
    var i;
    for (i = 0; i < cardFrontImgs.length; i++) {
        var firstCardImg = cardFrontImgs[i][0];
        id = "card" + i + "-" + "0";
        var firstCard = new Card(window.cardWidth, window.cardHeight, firstCardImg, backImg, i, id);
        cardsArray.push(firstCard);
        var secondCardImg = cardFrontImgs[i][1];
        id = "card" + i + "-" + "1";
        var secondCard = new Card(window.cardWidth, window.cardHeight, secondCardImg, backImg, i, id);
        cardsArray.push(secondCard);
    }
    return cardsArray;
}