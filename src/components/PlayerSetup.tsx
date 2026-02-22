import { useState } from "react";

type Props = {
  onStart: (players: string[]) => void;
};

export default function PlayerSetup({ onStart }: Props) {
  const [players, setPlayers] = useState<string[]>([]);
  const [name, setName] = useState("");

  function addPlayer() {
    if (!name.trim()) return;
    if (players.length >= 18) return;

    setPlayers([...players, name.trim()]);
    setName("");
  }

  function startGame() {
    if (players.length < 3) return;
    onStart(players);
  }

  return (
    <div>
      <h2>Setup Players (3–18)</h2>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Player name"
      />
      <button onClick={addPlayer}>Add</button>

      <ul>
        {players.map((p, i) => (
          <li key={i}>{p}</li>
        ))}
      </ul>

      <button
        disabled={players.length < 3}
        onClick={startGame}
      >
        Start Game
      </button>
    </div>
  );
}