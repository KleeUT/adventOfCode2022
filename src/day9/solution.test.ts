import { describe, expect, it, test } from "vitest";
import {
  countUniqueLocations,
  move,
  MoveDirection,
  parse,
  part1,
  updateTail,
  type Location,
  updateTrackingLastTen,
} from "./solution";

describe("day 8", () => {
  test.each([
    { location: { x: 0, y: 0 }, direction: "U", newLocation: { x: 0, y: 1 } },
    { location: { x: 0, y: 0 }, direction: "D", newLocation: { x: 0, y: -1 } },
    { location: { x: 0, y: 0 }, direction: "L", newLocation: { x: -1, y: 0 } },
    { location: { x: 0, y: 0 }, direction: "R", newLocation: { x: 1, y: 0 } },
  ])(
    "moving $location $direction results in $newLocation",
    ({ location, direction, newLocation }) => {
      expect(move(location, direction as MoveDirection)).toEqual(newLocation);
    }
  );

  test("if tail and head are the same the head", () => {
    const head = { x: 0, y: 0 };
    const tail = { ...head };
    expect(updateTail(head, head, [tail])).toEqual([{ ...head }]);
  });
  test.each([
    { tailArray: [{ x: 0, y: 0 }] },
    { tailArray: [{ x: 0, y: 1 }] },
    { tailArray: [{ x: 0, y: 2 }] },

    { tailArray: [{ x: 1, y: 0 }] },

    { tailArray: [{ x: 1, y: 2 }] },

    { tailArray: [{ x: 2, y: 0 }] },
    { tailArray: [{ x: 2, y: 1 }] },
    { tailArray: [{ x: 2, y: 2 }] },
  ])("if tail and head are within 1", ({ tailArray }) => {
    const head = { x: 1, y: 1 };
    expect(updateTail(head, head, tailArray)).toEqual([...tailArray]);
  });

  test("Moves tail to the last head catch up when it's more than 1 from the current head", () => {
    const currentHead = { x: 2, y: 1 };
    const lastHead = { x: 1, y: 1 };
    const tailArray = [{ x: 0, y: 0 }];
    expect(updateTail(currentHead, lastHead, tailArray)).toEqual([
      ...tailArray,
      lastHead,
    ]);
  });
  test("Moves tail to the last head catch up when it's more than 1 from the current head", () => {
    const currentHead = { x: 1, y: 2 };
    const lastHead = { x: 1, y: 1 };
    const tailArray = [{ x: 0, y: 0 }];
    expect(updateTail(currentHead, lastHead, tailArray)).toEqual([
      ...tailArray,
      lastHead,
    ]);
  });
  test("parses input", () => {
    expect(parse(["U 4", "D 2", "L 3", "R 2"].join("\n"))).toEqual([
      "U",
      "U",
      "U",
      "U",
      "D",
      "D",
      "L",
      "L",
      "L",
      "R",
      "R",
    ]);
  });

  test.each([
    {
      locations: [],
      count: 0,
    },
    {
      locations: [{ x: 1, y: 1 }],
      count: 1,
    },
    {
      locations: [{ x: 1, y: 1 }],
      count: 1,
    },
    {
      locations: [
        { x: 1, y: 1 },
        { x: 0, y: 1 },
      ],
      count: 2,
    },
    {
      locations: [
        { x: 1, y: 1 },
        { x: 1, y: 1 },
      ],
      count: 1,
    },
    {
      locations: [
        { x: 1, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 0 },
        { x: 1, y: 1 },
      ],
      count: 4,
    },
  ])("counts unique locations", ({ locations, count }) => {
    expect(countUniqueLocations(locations)).toEqual(count);
  });

  test("part 1", () => {
    expect(
      part1(["R 4", "U 4", "L 3", "D 1", "R 4", "D 1", "L 5", "R 2"].join("\n"))
    ).toEqual(13);
  });

  function location(x: number, y: number): Location {
    return {
      x,
      y,
    };
  }

  function thisManyLocations(n: number, l: Location): Location[] {
    let out: Location[] = [];
    for (let i = 0; i < n; i++) {
      out.push(l);
    }
    return out;
  }
  // describe.skip("Update last ten", () => {
  //   //move head
  //   // if the next spot needs to move move it
  //   // do that for 1-9
  //   // if 9 moves add it top the tail locations

  //   it("should not move the tail if the head is close", () => {
  //     expect(
  //       updateTrackingLastTen(
  //         location(1, 1),
  //         "D",
  //         thisManyLocations(9, location(1, 1)),
  //         []
  //       )
  //     ).toEqual({
  //       head: location(1, 0),
  //       lastTen: thisManyLocations(9, location(1, 1)),
  //       tailLocations: [],
  //     });
  //   });
  //   it("should not move the start of the tail if the head moves further", () => {
  //     expect(
  //       updateTrackingLastTen(
  //         location(0, 0),
  //         "D",
  //         thisManyLocations(9, location(1, 1)),
  //         []
  //       )
  //     ).toEqual({
  //       head: location(0, -1),
  //       lastTen: [location(0, 0), ...thisManyLocations(8, location(1, 1))],
  //       tailLocations: [],
  //     });
  //   });
  //   it("should not move the start of the tail if the head moves further", () => {
  //     expect(
  //       updateTrackingLastTen(
  //         location(0, 0),
  //         "D",
  //         thisManyLocations(9, location(1, 1)),
  //         []
  //       )
  //     ).toEqual({
  //       head: location(0, -1),
  //       lastTen: [location(0, 0), ...thisManyLocations(8, location(1, 1))],
  //       tailLocations: [],
  //     });
  //   });
  // });
});
