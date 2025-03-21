import OBR from "@owlbear-rodeo/sdk";
import CardDeck from "./assets/cardUtil";

const ID = "com.datavikings.deck-o-cards";

export function setupContextMenu() {
  // OBR.contextMenu.create({
  //   id: `${ID}/context-menu`,
  //   icons: [
  //     {
  //       icon: "/deck-o-cards/icon.svg",
  //       label: "Draw Initiative",
  //       filter: {
  //         every: [{ key: "layer", value: "CHARACTER" }],
  //       },
  //     },
  //   ],
  //   onClick(context) {
  //       console.info(context);
  //       const initiative = '👑♠';
  //       //let cardDeck = OBR.scene.metadata[ID];
  //       // console.info('cardDeck', cardDeck);
  //       console.info('ID', OBR.room.id)
  //       OBR.scene.items.updateItems(context.items, (items) => {
  //           for(let item of items) {
  //               console.info(`Setting initiative for ${ID}`);
  //               OBR.player.getName().then((result) => {
  //                   //let theCard = cardDeck.drawCard();
  //                   console.info(`${result} drew ${theCard} initiative`)
  //               });
  //               item.metadata[`${ID}/metadata`] = {
  //                   initiative
  //               };
  //           }
  //       });
  //   },
  // });
}