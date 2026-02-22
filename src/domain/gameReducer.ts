import type { GameState, Player, Card } from "./types";
import { createDeck, shuffle } from "./deck";
import {
  getNumberValues,
  hasDuplicate,
  calculateRoundScore,
  allPlayersFinished,
} from "./rules";

type Action =
  | { type: "HIT" }
  | { type: "STAY" }
  | { type: "NEXT_ROUND" }
  | { type: "RESET" };

export function createInitialGame(names: string[]): GameState {
  return {
    players: names.map((name, i) => ({
      id: String(i),
      name,
      cards: [],
      stopped: false,
      busted: false,
      hasSecondChance: false,
      totalScore: 0,
    })),
    deck: createDeck(),
    discardPile: [],
    currentPlayerIndex: 0,
    round: 1,
    status: "playing",
  };
}

function drawCard(state: GameState): {
  card: Card | undefined;
  deck: Card[];
  discardPile: Card[];
} {
  let deck = state.deck;
  let discardPile = state.discardPile;

  if (deck.length === 0) {
    deck = shuffle(discardPile);
    discardPile = [];
  }

  const card = deck[deck.length - 1];
  return {
    card,
    deck: deck.slice(0, -1),
    discardPile,
  };
}

function getNextActivePlayerIndex(
  players: Player[],
  currentIndex: number
): number {
  const total = players.length;

  if (players.every((p) => p.stopped || p.busted)) {
    return currentIndex;
  }

  let next = currentIndex;
  for (let i = 0; i < total; i++) {
    next = (next + 1) % total;
    if (!players[next].stopped && !players[next].busted) {
      return next;
    }
  }

  return currentIndex;
}

export function gameReducer(state: GameState, action: Action): GameState {
  if (state.status === "game-over") return state;

  switch (action.type) {
    case "HIT": {
      const current = state.players[state.currentPlayerIndex];

      if (current.stopped || current.busted) return state;

      const { card, deck, discardPile } = drawCard(state);
      if (!card) return state;

      const updatedPlayer: Player = {
        ...current,
        cards: [...current.cards, card],
      };

      let updatedPlayers = state.players.map((p, i) =>
        i === state.currentPlayerIndex ? updatedPlayer : p
      );

      if (card.type === "number") {
        const numbers = getNumberValues(updatedPlayer);

        if (hasDuplicate(numbers)) {
          const player = updatedPlayers[state.currentPlayerIndex];

          if (player.hasSecondChance) {
            updatedPlayers = updatedPlayers.map((p, i) =>
              i === state.currentPlayerIndex
                ? { ...p, hasSecondChance: false }
                : p
            );
          } else {
            updatedPlayers = updatedPlayers.map((p, i) =>
              i === state.currentPlayerIndex
                ? { ...p, busted: true, stopped: true }
                : p
            );
          }
        }
      }

      if (card.type === "secondChance") {
        updatedPlayers = updatedPlayers.map((p, i) =>
          i === state.currentPlayerIndex
            ? { ...p, hasSecondChance: true }
            : p
        );
      }

      if (card.type === "freeze") {
        const targetIndex =
          (state.currentPlayerIndex + 1) %
          updatedPlayers.length;

        updatedPlayers = updatedPlayers.map((p, i) =>
          i === targetIndex ? { ...p, stopped: true } : p
        );
      }

      if (card.type === "flipThree") {
      const tempPlayers = [...updatedPlayers];
      let tempDeck = deck;

      for (let i = 0; i < 3; i++) {
        const draw = drawCard({
          ...state,
          deck: tempDeck,
        });

        if (!draw.card) break;

        tempDeck = draw.deck;

        const player = tempPlayers[state.currentPlayerIndex];
        const updated = {
          ...player,
          cards: [...player.cards, draw.card],
        };

        tempPlayers[state.currentPlayerIndex] = updated;

        if (
          draw.card.type === "number" &&
          hasDuplicate(getNumberValues(updated))
        ) {
          tempPlayers[state.currentPlayerIndex] = {
            ...updated,
            busted: true,
            stopped: true,
          };
          break;
        }
      }

      updatedPlayers = tempPlayers;
    }

      const newDiscardPile = [...discardPile, card];

      if (allPlayersFinished(updatedPlayers)) {
        return endRound({
          ...state,
          players: updatedPlayers,
          deck,
          discardPile: newDiscardPile,
        });
      }

      const nextIndex = getNextActivePlayerIndex(
        updatedPlayers,
        state.currentPlayerIndex
      );

      return {
        ...state,
        players: updatedPlayers,
        deck,
        discardPile: newDiscardPile,
        currentPlayerIndex: nextIndex,
      };
    }

    case "STAY": {
      const updatedPlayers = state.players.map((p, i) =>
        i === state.currentPlayerIndex ? { ...p, stopped: true } : p
      );

      if (allPlayersFinished(updatedPlayers)) {
        return endRound({
          ...state,
          players: updatedPlayers,
        });
      }

      const nextIndex = getNextActivePlayerIndex(
        updatedPlayers,
        state.currentPlayerIndex
      );

      return {
        ...state,
        players: updatedPlayers,
        currentPlayerIndex: nextIndex,
      };
    }

    case "NEXT_ROUND":
      return startNextRound(state);

    case "RESET":
      return createInitialGame(state.players.map((p) => p.name));

    default:
      return state;
  }
}

function endRound(state: GameState): GameState {
  const updatedPlayers = state.players.map((p) => ({
    ...p,
    totalScore: p.totalScore + calculateRoundScore(p),
  }));

  const winner = updatedPlayers.find(
    (p) => p.totalScore >= 200
  );

  return {
    ...state,
    players: updatedPlayers,
    status: winner ? "game-over" : "round-over",
    winnerId: winner ? winner.id : undefined,
  };
}


function startNextRound(state: GameState): GameState {
  return {
    ...state,
    players: state.players.map((p) => ({
      ...p,
      cards: [],
      stopped: false,
      busted: false,
      hasSecondChance: false,
    })),
    round: state.round + 1,
    status: "playing",
  };
}