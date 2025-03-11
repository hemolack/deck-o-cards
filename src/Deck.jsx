import React, { useEffect, useState } from 'react';
import OBR from '@owlbear-rodeo/sdk';
import Card from './Card';
import cardMap from './card_map';
import classes from './Deck.module.css';

const Deck = () => {
    const initialArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53];
    const [cards, setCards] = useState([...initialArray]);
    const [drawn, setDrawn] = useState([]);
    const [shuffled, setShuffled] = useState(false);

    const drawCard = () => {
        if(cards.length < 1) {
            return;
        }
        let draw = cards[0];
        setCards((cards) => cards.slice(1));
        setDrawn([...drawn, draw]);
        if(OBR.isAvailable && OBR.isReady) {
            OBR.player.getName().then((result) => {
                let playerName = result;
                console.info(`Player ${playerName} drew ${cardMap[draw].valueName}${cardMap[draw].suitName}`);
                // sendRemoteMessage(`${playerName} drew ${cardMap[draw].valueName ? cardMap[draw].valueName : cardMap[draw].value} ${cardMap[draw].suitName ? ' of ' + cardMap[draw].suitName : ''}`);
                // OBR.notification.show(`${playerName} drew ${cardMap[draw].valueName ? cardMap[draw].valueName : cardMap[draw].value} ${cardMap[draw].suitName ? ' of ' + cardMap[draw].suitName : ''}`)
            })
        }
    }

    const sendRemoteMessage = (message) => {
        if(OBR.isAvailable && OBR.isReady) {
            OBR.broadcast.sendMessage('com.datavikings.deck-o-cards', message);
        }
        else {
            console.info('Available? ' , OBR.isAvailable);
            console.info('Ready? ' , OBR.isReady);
        }
        console.info(message);
    }

    const shuffle = () => {
        let shuffled = [...cards];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
        }
        setCards(shuffled);
        setShuffled(true);
    }

    const reset = () => {
        setCards([...initialArray]);
        setDrawn([]);
        setShuffled(false);
    }

    useEffect(() => {
        shuffle();
    }, []); 

    return (
        <div className={classes.Container}>
            <div>{cards.length} cards left { shuffled ? '' : 'NOT SHUFFLED' }</div>
            <button onClick={drawCard} title="Draw a card" disabled={cards.length < 1 || !shuffled}>🃏 Draw</button> 
            <button onClick={shuffle} title="Shuffle remaining cards">🔀 Shuffle</button>
            <button onClick={reset} title="Reset deck to sorted order">🔄 Reset</button>
            <div>
                <div className={classes.CardArea}>
                    {drawn.map((c) => {
                        return <Card key={c} cardIndex={c} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Deck;