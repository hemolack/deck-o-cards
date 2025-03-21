import OBR from '@owlbear-rodeo/sdk';

class CardDeck {
    initialArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53];
    shuffled = false;

    constructor() {
        this.cards = [];
        this.drawn = [];
        this.shuffled = false;
    }

    shuffle = () => {
        let shuffledDeck = [...cards];
        for (let i = shuffledDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledDeck[i], shuffledDeck[j]] = [shuffledDeck[j], shuffledDeck[i]]; // Swap elements
        }
        this.cards = shuffledDeck;
        this.shuffled = true;
    }

    drawCard = () => {
        if(cards.length < 1) {
            return;
        }
        let draw = cards[0];
        this.cards = cards.slice(1);
        this.drawn = [...drawn, draw];
        if(OBR.isAvailable && OBR.isReady) {
            OBR.player.getName().then((result) => {
                let playerName = result;
                console.info(`Player ${playerName} drew ${cardMap[draw].value}${cardMap[draw].suit}`);
                // sendRemoteMessage(`${playerName} drew ${cardMap[draw].valueName ? cardMap[draw].valueName : cardMap[draw].value} ${cardMap[draw].suitName ? ' of ' + cardMap[draw].suitName : ''}`);
                // OBR.notification.show(`${playerName} drew ${cardMap[draw].valueName ? cardMap[draw].valueName : cardMap[draw].value} ${cardMap[draw].suitName ? ' of ' + cardMap[draw].suitName : ''}`)
            })
        }
        return draw;
    }
}

export default CardDeck;