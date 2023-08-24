class Game {
    constructor(){
        this.btn = document.querySelector('button');
        this.cards = document.querySelectorAll('.img-holder');
        this.cardIndex = 0;
        this.randommFiveCards = [];
        this.round = 0;
        this.finalCards = [];
    }
    init (){
        this.btn.addEventListener('click', ()=> this.flip());
    }

    flip(){
        (this.round === 1) ? this.round = 2 : this.round = 1;
        if (this.round === 1){
            this.removeAllSelected();
        }
        this.btn.innerHTML = "Start " + this.round;
        this.cardIndex = 0;
        this.turnOnBack();
       }

        removeAllSelected (){
            document.querySelectorAll('.selected').forEach(div =>{
                div.classList.remove('selected', 'cardWin');
            })
       }

       turnOnBack (){
        this.cards.forEach(card=>{
            let front = card.querySelector('.front:not(.selected)');
            let back = card.children[1];
            if (front){
                front.style.transform = "perspective(900px) rotateY(180deg)";
                back.style.transform = "perspective(900px) rotateY(0)";
            }
            
        })
        setTimeout(()=>{
            this.shuffleCards();
            this.reveal();
        },100)
       }

       reveal (){
        let cardFront = this.cards[this.cardIndex].querySelector('.front:not(.selected)');
        let cardBack = this.cards[this.cardIndex].querySelector('.back');
        if (cardFront){
            this.finalCards[this.cardIndex] = this.randommFiveCards[this.cardIndex];
        cardFront.children[0].setAttribute('src', this.getImage());
        cardFront.setAttribute('data-id', this.randommFiveCards[this.cardIndex].getCard())
        cardFront.onclick = function(){
            cardFront.classList.toggle('selected');
        }
        setTimeout (()=>{
            cardBack.style.transform = "perspective(900px) rotateY(180deg)";
            cardFront.style.transform = "perspective(900px) rotateY(0)";
            this.cardIndex++;
            if (this.cardIndex < this.cards.length){
                this.reveal();
            } else if (this.round === 2){
                this.checkWins();
            }
        },100)
        }else {
            this.cardIndex++;
            if (this.cardIndex < this.cards.length){
                this.reveal();
            }else if(this.round === 2){
                this.checkWins();
            }
        }
       }

       getImage(){
        return "img/"+this.randommFiveCards[this.cardIndex].sign+"_"+this.randommFiveCards[this.cardIndex].value+".png";
       }
       shuffleCards (){
        this.randommFiveCards = deck.fiveRandomCards();
       }

       checkWins(){
        let wins = new Wins(this.finalCards);
        if (wins.royalFlash()){
            console.log("Royal Flush")
            this.selectedWinCards(wins);
        }else if (wins.straightFlush()){
            console.log("Straight Flush");
            this.selectedWinCards(wins);
        }else if (wins.poker()){
            console.log("Poker");
            this.selectedWinCards(wins);
        }else if(wins.fullHouse()){
            console.log("Full house");
            this.selectedWinCards(wins);
        }else if(wins.straight){
            console.log("test");
            this.selectedWinCards(wins);
        }else if(wins.threeOfKind){
            console.log("Three of A kind");
            this.selectedWinCards(wins);
        }else if(wins.twoPairs){
            console.log("Two Pairs");
            this.selectedWinCards(wins);
        }else if(wins.jacksOrBetter){
            console.log("Jacks or better");
            this.selectedWinCards(wins);
        }
       }
       selectedWinCards(wins){
            wins.winCards.flat().forEach(card=>{
                document.querySelector('[data-id="'+card.getCard()+'"]').classList.add('cardWin', 'selected');
            })
       }
    }

    
    let game = new Game();
    game.init();