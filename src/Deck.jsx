import React, { useEffect, useState } from 'react';
import OBR from '@owlbear-rodeo/sdk';
import Card from './Card';
import cardMap from './card_map';
import CardDeck from './assets/cardUtil';
import classes from './Deck.module.css';

const Deck = () => {
    const initialArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53];
    const [cards, setCards] = useState([...initialArray]);
    const [drawn, setDrawn] = useState([]);
    const [role, setRole] = useState(null);
    const [shuffled, setShuffled] = useState(false);
    const [ready, setReady] = useState(false);
    const [playerName, setPlayerName] = useState(null);
    const cardDeck = new CardDeck();
    const ID = "com.datavikings.deck-o-cards";

    const cardDrawn = (draw, player) => {
        let newDrawn = [...drawn];
        newDrawn.push({ card: draw, player: player });
        setDrawn(newDrawn);
    }

    const handleReset = () => {
        setCards([...initialArray]);
        setDrawn([]);
        setShuffled(false);
    }

    const drawCard = () => {
        if(cards.length < 1) {
            return;
        }
        let draw = cards[0];
        let newDeck = cards.slice(1);
        setCards(newDeck);
        setDrawn([...drawn, { card: draw, player: playerName }]);
        if(OBR.isAvailable && OBR.isReady) {
            let message = {
                action: 'draw',
                player: playerName,
                deck: newDeck,
                card: draw
            };
            OBR.broadcast.sendMessage(ID, message);
        }
    }

    OBR.onReady(() => {
        if(!ready) {
            setReady(true);
        }
    })

    const shuffle = () => {
        let shuffled = [...cards];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
        }
        let message = {
            action: 'shuffle',
            deck: cards
        };
        OBR.broadcast.sendMessage(ID, message);
        setCards(shuffled);
        setShuffled(true);
    }

    const reset = () => {
        handleReset();
        let message = {
            action: 'reset'
        };
        OBR.broadcast.sendMessage(ID, message);
    }

    useEffect(() => {
        if(ready) {
            shuffle();
            OBR.player.getRole().then((result) => {
                setRole(result);
            })
            OBR.player.getName().then((result) => {
                setPlayerName(result);
            })
        }
    }, [ready]);

    if(ready) {
        OBR.broadcast.onMessage(ID, (event) => {
            if(event.data.action === 'shuffle') {
                setCards(event.data.deck);
                setShuffled(true);
            }
            else if(event.data.action === 'draw') {
                cardDrawn(event.data.card, event.data.player);
                setCards(event.data.deck);
            }
            else if(event.data.action === 'reset') {
                handleReset();
            }
        });
    }

    if(OBR.isAvailable && OBR.isReady) {
        return (
            <div className={classes.Container}>
                <div>{cards.length} cards left { shuffled ? '' : 'NOT SHUFFLED' }</div>
                <button onClick={drawCard} title="Draw a card" disabled={cards.length < 1 || !shuffled}>🃏 Draw</button> 
                <button onClick={shuffle} title="Shuffle remaining cards">🔀 Shuffle</button>
                <button onClick={reset} title="Reset deck to sorted order">🔄 Reset</button>
                <div>
                    <div className={classes.CardArea}>
                        {drawn.sort((a, b) => a.card - b.card).map((c) => {
                            return <Card key={c.card} cardIndex={c.card} player={c.player} />
                        })}
                    </div>
                </div>
            </div>
        )
    }
    else {
        return <div>OBR Initializing... {role}</div>
    }
    
}

export default Deck;