export type Location = {
  x: number;
  y: number;
};

export type MoveDirection = "U" | "D" | "L" | "R";

export function parse(input: string): MoveDirection[] {
  return input.split("\n").flatMap((line) => {
    const [move, times] = line.split(" ");
    let out = [];
    for (let i = 0; i < Number(times); i++) {
      out.push(move);
    }
    return out as MoveDirection[];
  });
}

export function move(location: Location, direction: MoveDirection): Location {
  switch (direction) {
    case "U":
      return { x: location.x, y: location.y + 1 };
    case "D":
      return { x: location.x, y: location.y - 1 };
    case "L":
      return { x: location.x - 1, y: location.y };
    case "R":
      return { x: location.x + 1, y: location.y };
  }
}

function shouldMove(currentHead: Location, knotLocation: Location): boolean {
  return (
    Math.abs(currentHead.x - knotLocation.x) > 1 ||
    Math.abs(currentHead.y - knotLocation.y) > 1
  );
}

export function updateTail(
  currentHead: Location,
  lastHead: Location,
  tailLocations: Location[]
): Location[] {
  const tail = tailLocations.at(-1)!;

  if (
    Math.abs(currentHead.x - tail.x) > 1 ||
    Math.abs(currentHead.y - tail.y) > 1
  ) {
    return [...tailLocations, lastHead];
  }
  return tailLocations;
}

export function countUniqueLocations(tailLocations: Location[]): number {
  return tailLocations.reduce(
    (p, c, i) =>
      tailLocations.findIndex((x) => x.x === c.x && x.y === c.y) === i
        ? p + 1
        : p,
    0
  );
}

export function part1(input: string): number {
  const moves = parse(input);
  let tailLocations: Location[] = [{ x: 0, y: 0 }];
  let head: Location = { x: 0, y: 0 };
  moves.forEach((moveDirection) => {
    let newHead = move(head, moveDirection);
    tailLocations = updateTail(newHead, head, tailLocations);
    head = newHead;
  });
  return countUniqueLocations(tailLocations);
}

export function updateTrackingLastTen(
  head: Location,
  direction: MoveDirection,
  lastTen: Location[],
  tailLocations: Location[]
): {
  head: Location;
  lastTen: Location[];
  tailLocations: Location[];
} {
  const newHead = move(head, direction);
  if (shouldMove(newHead, lastTen.at(0)!)) {
    return {
      head: newHead,
      lastTen: [head, ...lastTen].slice(0, 9),
      tailLocations,
    };
  }

  return {
    head: newHead,
    lastTen,
    tailLocations,
  };
}

export function part2(input: string): number {
  return 0;
}
