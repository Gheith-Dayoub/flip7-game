type Props = {
  status: "playing" | "round-over" | "game-over";
  onHit: () => void;
  onStay: () => void;
  onNextRound: () => void;
  onReset: () => void;
};

export default function Controls({
  status,
  onHit,
  onStay,
  onNextRound,
  onReset,
}: Props) {
  return (
    <div style={{ marginTop: 20 }}>
      {status === "playing" && (
        <>
          <button onClick={onHit} style={{ marginRight: 10 }}>
            Hit
          </button>

          <button onClick={onStay}>
            Stay
          </button>
        </>
      )}

      {status === "round-over" && (
        <button onClick={onNextRound}>
          Start Next Round
        </button>
      )}

      {status === "game-over" && (
        <>
          <h2>Game Over</h2>
          <button onClick={onReset}>
            Restart Game
          </button>
        </>
      )}
    </div>
  );
}
