import { describe, expect, it, test } from "vitest";
import {
  asString,
  canMoveTo,
  findPaths,
  hasBeenBefore,
  MapNode,
  parseInput,
} from "./solution";
describe("day 12", () => {
  it("should read input", () => {
    const node11: MapNode = {
      height: 1,
      coordinates: { row: 0, column: 0 },
    };
    const node12: MapNode = { height: 2, coordinates: { row: 0, column: 1 } };
    const node21: MapNode = { height: 3, coordinates: { row: 1, column: 0 } };
    const node22: MapNode = { height: 26, coordinates: { row: 1, column: 1 } };

    expect(parseInput(["Sb", "cE"].join("\n"))).toEqual({
      startNode: node11,
      endNode: node22,
      map: [
        [node11, node12],
        [node21, node22],
      ],
    });
  });
  it.each([
    {
      nodea: { height: 2, coordinates: { row: 0, column: 1 } },
      nodeb: { height: 2, coordinates: { row: 0, column: 1 } },
      expected: false,
    },
    {
      nodea: { height: 2, coordinates: { row: 0, column: 9 } },
      nodeb: { height: 2, coordinates: { row: 0, column: 1 } },
      expected: false,
    },
    {
      nodea: { height: 2, coordinates: { row: 0, column: 1 } },
      nodeb: { height: 2, coordinates: { row: 5, column: 1 } },
      expected: false,
    },

    {
      nodea: { height: 2, coordinates: { row: 1, column: 1 } },
      nodeb: { height: 2, coordinates: { row: 0, column: 1 } },
      expected: true,
    },
    {
      nodea: { height: 2, coordinates: { row: 1, column: 1 } },
      nodeb: { height: 4, coordinates: { row: 0, column: 1 } },
      expected: false,
    },
    {
      nodea: { height: 19, coordinates: { row: 1, column: 1 } },
      nodeb: { height: 4, coordinates: { row: 0, column: 1 } },
      expected: true,
    },
    {
      nodea: { height: 19, coordinates: { row: 1, column: 1 } },
      nodeb: undefined,
      expected: false,
    },
  ])(
    "can move to $nodea to $nodeb? $expected",
    ({ nodea, nodeb, expected }) => {
      expect(canMoveTo(nodea, nodeb)).toEqual(expected);
    }
  );
  it("Can convert node to string representation", () => {
    expect(asString({ row: 1, column: 12 })).toEqual('{"row":1,"column":12}');
  });
  it("Has not been before", () => {
    expect(
      hasBeenBefore(new Set(['{"row":1,"column":12}']), {
        row: 1,
        column: 3,
      })
    ).toEqual(false);
  });
  it("Has  been before", () => {
    expect(
      hasBeenBefore(new Set(['{"row":1,"column":12}']), {
        row: 1,
        column: 12,
      })
    ).toEqual(true);
  });
  describe("find paths", () => {
    it("should return [] if there are no paths", () => {
      const node11: MapNode = {
        height: 1,
        coordinates: { row: 0, column: 0 },
      };
      const node12: MapNode = { height: 2, coordinates: { row: 0, column: 1 } };
      const node21: MapNode = { height: 3, coordinates: { row: 1, column: 0 } };
      const node22: MapNode = {
        height: 26,
        coordinates: { row: 1, column: 1 },
      };
      expect(
        findPaths({
          startNode: node11,
          endNode: node22,
          map: [
            [node11, node12],
            [node21, node22],
          ],
        })
      ).toEqual(-2);
    });
    it("should return a path including ", () => {
      const node00: MapNode = { height: 1, coordinates: { row: 0, column: 0 } };
      const node01: MapNode = { height: 2, coordinates: { row: 0, column: 1 } };
      const node10: MapNode = { height: 3, coordinates: { row: 1, column: 0 } };
      const node11: MapNode = { height: 3, coordinates: { row: 1, column: 1 } };
      expect(
        findPaths({
          startNode: node00,
          endNode: node11,
          map: [
            [node00, node01],
            [node10, node11],
          ],
        })
      ).toEqual(2);
    });
  });
});
