import { i } from "vitest/dist/index-9f5bc072";

export enum Visibility {
  visible = "visible",
  hidden = "hidden",
}

export type AssessedTree = {
  height: number;
  visible: Visibility;
};

export type AssessedTreeLine = AssessedTree[];

export function assessTreeLine(treeLine: number[]): AssessedTreeLine {
  const result = treeLine.reduce(
    (assessed, current) => {
      const previousTree = assessed.assessed.at(-1);
      let visible = Visibility.visible;
      if (
        previousTree &&
        (previousTree.height > current || current <= assessed.highest)
      ) {
        visible = Visibility.hidden;
      }

      return {
        highest: Math.max(assessed.highest, current),
        assessed: [...assessed.assessed, { height: current, visible }],
      };
    },
    { assessed: [], highest: 0 } as {
      assessed: AssessedTreeLine;
      highest: number;
    }
  );
  return result.assessed;
}

function combineLines(
  one: AssessedTreeLine,
  two: AssessedTreeLine
): AssessedTreeLine {
  return one.map((tree, index) => {
    const otherTree = two[index];

    return {
      ...tree,
      visible:
        tree.visible === Visibility.visible
          ? Visibility.visible
          : otherTree.visible,
    };
  });
}
export function assessTreeLineBidirectional(
  treeLine: number[]
): AssessedTreeLine {
  const assessedForward = assessTreeLine(treeLine);
  const assessedBackward = assessTreeLine(treeLine.reverse()).reverse();
  return combineLines(assessedForward, assessedBackward);
}

export function columnsAsRows<T>(twoD: T[][]): T[][] {
  const out: T[][] = [];
  twoD.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      if (!out[columnIndex]) {
        out[columnIndex] = [];
      }
      out[columnIndex][rowIndex] = column;
    });
  });
  return out;
}

export function combineAssessments(
  one: AssessedTreeLine[],
  two: AssessedTreeLine[]
): AssessedTreeLine[] {
  return one.map((line, index) => {
    return combineLines(line, two[index]);
  });
}

function parseToMap(input: string): Map {
  return input.split("\n").map((line) => line.split("").map(Number));
}

export function part1(input: string): number {
  const lines = parseToMap(input);
  const lines2 = parseToMap(input);
  const leftToRight = lines.map(assessTreeLineBidirectional);
  const topToBottom = columnsAsRows(
    columnsAsRows(lines2).map(assessTreeLineBidirectional)
  );
  const combined = combineAssessments(leftToRight, topToBottom);
  return combined.flatMap((r) =>
    r.filter((x) => x.visible === Visibility.visible)
  ).length;
}

export type TreeLocation = {
  row: number;
  column: number;
};
export type Map = number[][];
export type Tree = {
  height: number;
  location: TreeLocation;
};
export function findTreeLines(
  tree: TreeLocation,
  map: Map
): {
  treesNorth: number[];
  treesSouth: number[];
  treesEast: number[];
  treesWest: number[];
} {
  const treesWest = map.at(tree.row)?.slice(0, tree.column)!;
  const treesEast = map.at(tree.row)?.slice(tree.column + 1)!;
  const { treesNorth, treesSouth } = map.reduce(
    (p, c, i) => {
      if (i < tree.row) {
        p.treesNorth.push(c[tree.column]);
      }
      if (i > tree.row) {
        p.treesSouth.push(c[tree.column]);
      }
      return p;
    },
    {
      treesNorth: [] as number[],
      treesSouth: [] as number[],
    }
  );
  const result = {
    treesNorth: treesNorth.reverse(),
    treesSouth,
    treesEast,
    treesWest: treesWest.reverse(),
  };
  return result;
}

export function countVisibleTrees(tree: number, treeLine: number[]): number {
  let i = 0;
  for (; i < treeLine.length; i++) {
    if (treeLine[i] >= tree) {
      return i + 1;
    }
  }
  return treeLine.length;
}

export function countVisibleTreesFromTree(
  treeLocation: TreeLocation,
  map: Map
): number {
  const { treesEast, treesNorth, treesSouth, treesWest } = findTreeLines(
    treeLocation,
    map
  );
  const north = countVisibleTrees(
    map[treeLocation.row][treeLocation.column],
    treesNorth
  );
  const east = countVisibleTrees(
    map[treeLocation.row][treeLocation.column],
    treesEast
  );
  const south = countVisibleTrees(
    map[treeLocation.row][treeLocation.column],
    treesSouth
  );
  const west = countVisibleTrees(
    map[treeLocation.row][treeLocation.column],
    treesWest
  );
  return north * south * east * west;
}

export function part2(input: string): number {
  let max = 0;
  const map = parseToMap(input);
  for (let r = 0; r < map.length; r++) {
    for (let c = 0; c < map[r].length; c++) {
      const visible = countVisibleTreesFromTree({ row: r, column: c }, map);
      if (visible > max) {
        max = visible;
      }
    }
  }
  return max;
}
