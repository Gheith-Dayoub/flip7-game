import type { Card } from "./types";

export function createDeck(): Card[] {
  const deck: Card[] = [];

  for (let value = 0; value <= 12; value++) {
    for (let i = 0; i <= value; i++) {
      deck.push({ type: "number", value });
    }
  }

  deck.push({ type: "freeze" });
  deck.push({ type: "flipThree" });
  deck.push({ type: "secondChance" });

  return shuffle(deck);
}

export function shuffle(cards: Card[]): Card[] {
  return [...cards].sort(() => Math.random() - 0.5);
}
