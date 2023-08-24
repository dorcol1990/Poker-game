class Card {
    sign;
    value;
    constructor (sign, value){
        this.sign = sign;
        this.value = value;
    }
    getCard(){
        return this.sign+this.value;
    }
}

let cardsAll = [];

let cardValues = [2,3,4,5,6,7,8,9,10, "ace", "jack", "queen", "king"];
let signs = ["clubs", "diamonds", "hearts", "spades"];


signs.forEach(sign=>{
    cardValues.forEach(val=>{
        cardsAll.push(new Card(sign, val))
    })
})