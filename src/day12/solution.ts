import { e } from "vitest/dist/index-9f5bc072";

export interface Coordinate {
  row: number;
  column: number;
}
export interface MapNode {
  height: number;
  coordinates: Coordinate;
}

export function canMoveTo(from: MapNode, to?: MapNode): boolean {
  if (!to) {
    return false;
  }
  if (
    from.coordinates.row === to.coordinates.row &&
    from.coordinates.column === to.coordinates.column
  ) {
    return false;
  }
  if (
    !(
      Math.abs(from.coordinates.row - to.coordinates.row) <= 1 &&
      Math.abs(from.coordinates.column - to.coordinates.column) <= 1
    )
  ) {
    return false;
  }

  if (to.height - from.height <= 1) {
    return true;
  }
  return false;
}
export function asString(coordinates: Coordinate): string {
  return JSON.stringify(coordinates);
}

export function hasBeenBefore(nodes: Set<string>, next: Coordinate): boolean {
  return nodes.has(asString(next));
}

export function parseInput(input: string): {
  startNode: MapNode;
  endNode: MapNode;
  map: MapNode[][];
} {
  let startNode: MapNode | undefined = undefined;
  let endNode: MapNode | undefined = undefined;
  const map = input.split("\n").map((line, row) =>
    line.split("").map((char, column): MapNode => {
      const node: MapNode = {
        height: char.charCodeAt(0) - 96,
        coordinates: { row, column },
      };
      if (char === "S") {
        node.height = "a".charCodeAt(0) - 96;
        startNode = node;
      }
      if (char === "E") {
        node.height = "z".charCodeAt(0) - 96;
        endNode = node;
      }

      return node;
    })
  );

  if (!startNode || !endNode) {
    throw new Error("Developer mistake, no startNode or endNode set");
  }
  return {
    startNode,
    endNode,
    map,
  };
}

export function parseInputMultipleStarts(input: string): {
  startNodes: MapNode[];
  endNode: MapNode;
  map: MapNode[][];
} {
  let startNodes: MapNode[] = [];
  let endNode: MapNode | undefined = undefined;
  const map = input.split("\n").map((line, row) =>
    line.split("").map((char, column): MapNode => {
      const node: MapNode = {
        height: char.charCodeAt(0) - 96,
        coordinates: { row, column },
      };
      if (char === "S" || char === "a") {
        node.height = "a".charCodeAt(0) - 96;
        startNodes.push(node);
      }
      if (char === "E") {
        node.height = "z".charCodeAt(0) - 96;
        endNode = node;
      }

      return node;
    })
  );
  if (!endNode) {
    throw new Error("Couldn't find end node");
  }

  return {
    startNodes,
    endNode,
    map,
  };
}

function surroundingCoordinates(node: MapNode): Coordinate[] {
  return [
    {
      row: node.coordinates.row - 1,
      column: node.coordinates.column,
    },
    {
      row: node.coordinates.row + 1,
      column: node.coordinates.column,
    },
    {
      row: node.coordinates.row,
      column: node.coordinates.column - 1,
    },
    {
      row: node.coordinates.row,
      column: node.coordinates.column + 1,
    },
  ];
}

function getMapNode(
  coordinate: Coordinate,
  map: MapNode[][]
): MapNode | undefined {
  return map[coordinate.row]?.[coordinate.column];
}

function coordinatesEqual(c1: Coordinate, c2: Coordinate) {
  return c1.column === c2.column && c1.row === c2.row;
}

function pathFinder({
  startNode,
  endNode,
  map,
}: {
  startNode: MapNode;
  endNode: MapNode;
  map: MapNode[][];
}): number {
  const visitedNodes = new Map<string, number>();
  let steps = 0;
  let nextSteps = [[startNode]];
  for (let stepNodes of nextSteps) {
    let nextNodes = new Array<MapNode>();

    steps = steps + 1;
    for (let currentNode of stepNodes) {
      const stringifiedCoordinates = asString(currentNode.coordinates);

      if (coordinatesEqual(currentNode.coordinates, endNode.coordinates)) {
        return steps;
      }
      if (visitedNodes.has(stringifiedCoordinates)) {
        continue;
      } else {
        visitedNodes.set(stringifiedCoordinates, steps);
      }
      const findMapNode = (c: Coordinate): MapNode | undefined =>
        getMapNode(c, map);
      const neighbors = surroundingCoordinates(currentNode).map(findMapNode);

      for (let neighbor of neighbors) {
        if (neighbor && neighbor.height <= currentNode.height + 1) {
          nextNodes.push(neighbor);
        }
      }
    }
    if (nextNodes.length > 0) {
      nextSteps.push(nextNodes);
    }
  }

  return -1;
}

export function findPaths({
  startNode,
  endNode,
  map,
}: {
  startNode: MapNode;
  endNode: MapNode;
  map: MapNode[][];
}): number {
  return pathFinder({ startNode: startNode, endNode, map }) - 1;
}

export function part1(input: string): number {
  return findPaths(parseInput(input));
}

export function part2(input: string): number[] {
  const { startNodes, endNode, map } = parseInputMultipleStarts(input);
  return startNodes
    .map((startNode) => findPaths({ startNode, endNode, map }))
    .filter((x) => x > 0)
    .sort();
}
