export type NumberCard = {
  type: "number";
  value: number;
};

export type FreezeCard = { type: "freeze" };
export type FlipThreeCard = { type: "flipThree" };
export type SecondChanceCard = { type: "secondChance" };

export type Card =
  | NumberCard
  | FreezeCard
  | FlipThreeCard
  | SecondChanceCard;

export type Player = {
  id: string;
  name: string;
  cards: Card[];
  stopped: boolean;
  busted: boolean;
  hasSecondChance: boolean;
  totalScore: number;
};

export type GameStatus = "playing" | "round-over" | "game-over";

export type GameState = {
  players: Player[];
  deck: Card[];
  discardPile: Card[];
  currentPlayerIndex: number;
  round: number;
  winnerId?: string;
  status: GameStatus;
};
