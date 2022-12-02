import { Play } from "./Play";
import { Result } from "./Result";

const inputToPlay = new Map([
  ["A", Play.rock],
  ["B", Play.paper],
  ["C", Play.scissors],
  ["X", Play.rock],
  ["Y", Play.paper],
  ["Z", Play.scissors],
]);

const playToScore = new Map([
  [Play.rock, 1],
  [Play.paper, 2],
  [Play.scissors, 3],
]);

type Turn = {
  them: string;
  me: string;
};
export function resultForTurn(turn: Turn): number {
  const them = inputToPlay.get(turn.them)!;
  const me = inputToPlay.get(turn.me)!;
  return resultForPlays(them, me);
}

function resultForPlays(them: Play, me: Play): number {
  let result = Result.draw;
  if (them !== me) {
    if (them === Play.paper) {
      result = me === Play.rock ? Result.lose : Result.win;
    }
    if (them === Play.rock) {
      result = me === Play.scissors ? Result.lose : Result.win;
    }
    if (them === Play.scissors) {
      result = me === Play.paper ? Result.lose : Result.win;
    }
  }

  return result + playToScore.get(me)!;
}

export function calculateResult(input: string): number {
  const turns = input
    .split("\n")
    .filter((x) => x)
    .map((r) => {
      const [them, me] = r.split(" ");
      return {
        them,
        me,
      };
    });

  return turns.reduce((total, turn) => resultForTurn(turn) + total, 0);
}

const mapInputToDesiredOutcome = new Map([
  ["X", Result.lose],
  ["Y", Result.draw],
  ["Z", Result.win],
]);

export function calculateResult2(input: string): number {
  const turns = input
    .split("\n")
    .filter((x) => x)
    .map((r) => {
      const [theirInput, myInput] = r.split(" ");
      const them = inputToPlay.get(theirInput)!;
      return {
        them,
        me: findDesiredPlay(them, mapInputToDesiredOutcome.get(myInput)!),
      };
    });
  return turns.reduce(
    (total, turn) => resultForPlays(turn.them, turn.me) + total,
    0
  );
}

export function findDesiredPlay(them: Play, desiredResult: Result): Play {
  if (desiredResult === Result.win) {
    switch (them) {
      case Play.scissors:
        return Play.rock;
      case Play.rock:
        return Play.paper;
      case Play.paper:
        return Play.scissors;
    }
  }
  if (desiredResult === Result.lose) {
    switch (them) {
      case Play.paper:
        return Play.rock;
      case Play.scissors:
        return Play.paper;
      case Play.rock:
        return Play.scissors;
    }
  }
  return them;
}
