import type { Player } from "../domain/types";

type Props = {
  player: Player;
  isCurrent: boolean;
};

export default function PlayerView({
  player,
  isCurrent,
}: Props) {
  return (
    <div
      style={{
        border: isCurrent
          ? "2px solid #007bff"
          : "1px solid #ccc",
        padding: 12,
        marginBottom: 10,
        borderRadius: 8,
        background: isCurrent
          ? "#f0f8ff"
          : "#f9f9f9",
      }}
    >
      <h3>
        {player.name}
        {isCurrent && " (Current)"}
      </h3>

      <div style={{ marginBottom: 8 }}>
        {player.cards.length === 0 && (
          <span>No cards yet</span>
        )}

        {player.cards.map((card, index) => (
          <span
            key={index}
            style={{
              marginRight: 8,
              padding: "4px 8px",
              background: "#eee",
              borderRadius: 4,
              display: "inline-block",
            }}
          >
            {card.type === "number"
              ? card.value
              : card.type}
          </span>
        ))}
      </div>

      <div>
        {player.busted && (
          <strong style={{ color: "red" }}>
            BUSTED
          </strong>
        )}
        {player.stopped && !player.busted && (
          <strong style={{ color: "orange" }}>
            STOPPED
          </strong>
        )}
      </div>

      <div style={{ marginTop: 6 }}>
        Total Score: {player.totalScore}
      </div>
    </div>
  );
}
