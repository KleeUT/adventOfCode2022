import { describe, expect, it, test } from "vitest";

enum Visibility {
  visible = "visible",
  hidden = "hidden",
}

type AssessedTree = {
  height: number;
  visible: Visibility;
};

type AssessedTreeLine = AssessedTree[];

function assessTreeLine(treeLine: number[]): AssessedTreeLine {
  const result = treeLine.reduce(
    (assessed, current, index, array) => {
      const previousTree = assessed.assessed.at(-1);
      let visible = Visibility.visible;
      if (
        previousTree &&
        (previousTree.height >= current || current <= assessed.highest)
      ) {
        console.log("setting to hidden", { current, previousTree });
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

function assessTreeLineBidirectional(treeLine: number[]): AssessedTreeLine {
  const assessedForward = assessTreeLine(treeLine);
  const assessedBackward = assessTreeLine(treeLine.reverse()).reverse();
  return assessedForward.map((tree, index) => {
    const otherTree = assessedBackward[index];

    return {
      ...tree,
      visible:
        tree.visible === Visibility.visible
          ? Visibility.visible
          : otherTree.visible,
    };
  });
}

describe("day 8", () => {
  it("should find visible trees in one direction", () => {
    const treeLine = [0, 2, 3, 5, 4, 4, 5];
    const newRow = assessTreeLine(treeLine);
    expect(newRow).toEqual([
      { height: 0, visible: Visibility.visible },
      { height: 2, visible: Visibility.visible },
      { height: 3, visible: Visibility.visible },
      { height: 5, visible: Visibility.visible },
      { height: 4, visible: Visibility.hidden },
      { height: 4, visible: Visibility.hidden },
      { height: 5, visible: Visibility.hidden },
    ]);
  });

  it("should find visible trees in two directions", () => {
    const treeLine = [0, 2, 3, 5, 4, 4, 5, 4, 3];
    const newRow = assessTreeLineBidirectional(treeLine);
    expect(newRow).toEqual([
      { height: 0, visible: Visibility.visible },
      { height: 2, visible: Visibility.visible },
      { height: 3, visible: Visibility.visible },
      { height: 5, visible: Visibility.visible },
      { height: 4, visible: Visibility.hidden },
      { height: 4, visible: Visibility.hidden },
      { height: 5, visible: Visibility.visible },
      { height: 4, visible: Visibility.visible },
      { height: 3, visible: Visibility.visible },
    ]);
  });
});
