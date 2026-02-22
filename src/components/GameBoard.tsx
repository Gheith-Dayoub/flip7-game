import { useGame } from "../hooks/useGame";
import PlayerSetup from "./PlayerSetup";
import PlayerView from "./PlayerView";
import Controls from "./Controls";

export default function GameBoard() {
  const { state, startGame, dispatch } = useGame();

  if (state.status === "setup") {
    return <PlayerSetup onStart={startGame} />;
  }

  return (
    <div>
      <h2>Round {state.round}</h2>

      {state.players.map((player, index) => (
        <PlayerView
          key={player.id}
          player={player}
          isCurrent={index === state.currentPlayerIndex}
        />
      ))}
      {state.status === "game-over" && (
        <h2>
          Winner:{" "}
          {
            state.players.find(
              (p) => p.id === state.winnerId
            )?.name
          }
        </h2>
      )}

      <Controls
        status={state.status}
        onHit={() => dispatch({ type: "HIT" })}
        onStay={() => dispatch({ type: "STAY" })}
        onNextRound={() =>
          dispatch({ type: "NEXT_ROUND" })
        }
        onReset={() => dispatch({ type: "RESET" })}
      />
    </div>
  );
}
