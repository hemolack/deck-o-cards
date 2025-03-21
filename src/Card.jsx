import React from 'react';
import cardMap from './card_map';
import classes from './Card.module.css';

const Card = (props) => {
    let thisCard = cardMap[props.cardIndex];
    if(thisCard == null) {
        return null;
    }
    let classList = [classes.Card];
    let spinClass = null;
    if(thisCard.suit == '♦' || thisCard.suit == '♥') {
        classList.push(classes.RedSuit);
    }
    else if(thisCard.suit == '🃏') {
        classList.push(classes.JokerSuit);
        spinClass = classes.JokerText;
    }
    else {
        classList.push(classes.BlackSuit);
    }
    return (
        <div className={classes.CardContainer}>
            <div className={classes.PlayerName}>{props.player}</div>
            <div className={classList.join(' ')}>
                <div className={classes.TopSuit}>{thisCard.suit}</div>
                <div className={classes.CardValue + ' ' + spinClass}>{thisCard.value}</div>
                <div className={classes.BottomSuit}>{thisCard.suit}</div>
            </div>
        </div>
    )
}

export default Card;