interface Stacks {
  [key: string]: string[];
}

interface Move {
  from: number;
  to: number;
}
interface MoveWithCount {
  count: number;
  from: number;
  to: number;
}

export interface Game {
  stacks: Stacks;
  moves: Move[];
}
export interface GameWithMoveCount {
  stacks: Stacks;
  moves: MoveWithCount[];
}

function lineToMoves(line: string): Move[] {
  const out: Move[] = [];
  const [_move, count, _from, from, _to, to] = line.split(" ");
  for (let i = 0; i < Number(count); i++) {
    out.push({ from: Number(from), to: Number(to) });
  }
  return out;
}

function lineToMovesWithCount(line: string): MoveWithCount {
  const [_move, count, _from, from, _to, to] = line.split(" ");
  return { from: Number(from), to: Number(to), count: Number(count) };
}

function stackLinesToStacks(lines: string[], indexes: IndexMap[]): Stacks {
  const stacks: Stacks = {};
  indexes.forEach((i) => {
    stacks[i.stackIndex] = [];
  });
  return lines.reduceRight((stacks, line) => {
    indexes.forEach((i) => {
      const s = line.at(i.stringIndex)!;
      stacks[i.stackIndex].push(s);
    });
    return stacks;
  }, stacks);
}

type IndexMap = { stackIndex: number; stringIndex: number };

function findIndexes(indexLine: string): IndexMap[] {
  return indexLine.split("").reduce((p, c, stringIndex) => {
    if (c.trim() !== "") {
      p.push({ stackIndex: Number(c), stringIndex });
    }
    return p;
  }, [] as IndexMap[]);
}

export function parseInput(input: string): Game {
  const lines = input.split("\n");
  const separationLine = lines.indexOf("");
  const [indexLine, ...stackLines] = lines.slice(0, separationLine).reverse();
  const indexes = findIndexes(indexLine);
  const moveLines = lines.slice(separationLine);

  const stacks = stackLinesToStacks(stackLines, indexes);
  const moves = moveLines.flatMap(lineToMoves);
  return {
    stacks,
    moves,
  };
}

export function parseInputWithMoveCount(input: string): GameWithMoveCount {
  const lines = input.split("\n");
  const separationLine = lines.indexOf("");
  const [indexLine, ...stackLines] = lines.slice(0, separationLine).reverse();
  const indexes = findIndexes(indexLine);
  const moveLines = lines.slice(separationLine + 1);

  const stacks = stackLinesToStacks(stackLines, indexes);
  const moves = moveLines.map(lineToMovesWithCount);
  return {
    stacks,
    moves,
  };
}

export function readTopOfStacks(stacks: Stacks): string {
  const out: string[] = [];
  Object.keys(stacks).forEach((stackIndex) => {
    const [val] = stacks[stackIndex];
    out.push(val);
  });
  return out.join("");
}

export function applyMove(stacks: Stacks, move: Move): Stacks {
  const [item, ...updatedFromStack] = stacks[move.from];
  stacks[move.from] = updatedFromStack;
  stacks[move.to] = [item, ...stacks[move.to]];
  return stacks;
}

export function applyMoveWithCount(
  stacks: Stacks,
  move: MoveWithCount
): Stacks {
  const items = stacks[move.from].slice(0, move.count);
  const updatedFromStack = stacks[move.from].slice(move.count);
  stacks[move.from] = updatedFromStack;
  stacks[move.to] = [...items, ...stacks[move.to]];
  return stacks;
}

export function part1(input: string): string {
  const game = parseInput(input);
  game.moves.forEach((move) => {
    game.stacks = applyMove(game.stacks, move);
  });

  return readTopOfStacks(game.stacks);
}

export function part2(input: string): string {
  const game = parseInputWithMoveCount(input);
  game.moves.forEach((move) => {
    game.stacks = applyMoveWithCount(game.stacks, move);
  });

  return readTopOfStacks(game.stacks);
}
