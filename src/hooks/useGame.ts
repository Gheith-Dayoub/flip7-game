import { useReducer } from "react";
import {
  gameReducer,
  createInitialGame,
} from "../domain/gameReducer";
import type { GameState } from "../domain/types";

type SetupState =
  | { status: "setup" }
  | GameState;

function setupReducer(
  state: SetupState,
  action: any
): SetupState {
  if (state.status === "setup") {
    if (action.type === "START") {
      return createInitialGame(action.players);
    }
    return state;
  }

  return gameReducer(state, action);
}

export function useGame() {
  const [state, dispatch] = useReducer(
    setupReducer,
    { status: "setup" }
  );

  function startGame(players: string[]) {
    dispatch({ type: "START", players });
  }

  return {
    state,
    dispatch,
    startGame,
  };
}
