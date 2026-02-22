import type { Player } from "./types";

export function getNumberValues(player: Player): number[] {
  return player.cards
    .filter((c) => c.type === "number")
    .map((c: any) => c.value);
}

export function hasDuplicate(numbers: number[]): boolean {
  return numbers.some(
    (v, i) => numbers.indexOf(v) !== i
  );
}

export function calculateRoundScore(player: Player): number {
  if (player.busted) return 0;

  return getNumberValues(player).reduce((a, b) => a + b, 0);
}

export function allPlayersFinished(players: Player[]): boolean {
  return players.every(
    (p) => p.stopped || p.busted
  );
}
