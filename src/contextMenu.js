import OBR from "@owlbear-rodeo/sdk";

const ID = "com.datavikings.deck-o-cards";

export function setupContextMenu() {
  OBR.contextMenu.create({
    id: `${ID}/context-menu`,
    icons: [
      {
        icon: "/icon.svg",
        label: "Draw Initiative",
        filter: {
          every: [{ key: "layer", value: "CHARACTER" }],
        },
      },
    ],
    onClick(context) {
        console.info(context);
        const initiative = '👑♠';
        OBR.scene.items.updateItems(context.items, (items) => {
            for(let item of items) {
                console.info(`Setting initiative for ${ID}`);
                item.metadata[`${ID}/metadata`] = {
                    initiative
                };
            }
        });
    },
  });
}