import { describe, expect, test } from "vitest";
import {
  isCompleteOverlap,
  isPartialOverlap,
  parseInput,
  part1,
  part2,
} from "./solution";

describe("day 4", () => {
  describe("range finder", () => {
    test.each([
      {
        input: ["2-4,6-8", "2-3,4-5"],
        ranges: [
          {
            one: {
              lower: 2,
              upper: 4,
            },
            two: {
              lower: 6,
              upper: 8,
            },
          },
          {
            one: {
              lower: 2,
              upper: 3,
            },
            two: {
              lower: 4,
              upper: 5,
            },
          },
        ],
      },
    ])("Ranges $ranges, is overlap: $isOverlap", ({ ranges, input }) => {
      expect(parseInput(input.join("\n"))).toEqual(ranges);
    });
  });
  describe("overlap finder", () => {
    test.each([
      {
        range: {
          one: {
            lower: 2,
            upper: 4,
          },
          two: {
            lower: 6,
            upper: 8,
          },
        },
        overlap: false,
      },
      {
        range: {
          one: {
            lower: 2,
            upper: 5,
          },
          two: {
            lower: 4,
            upper: 8,
          },
        },
        overlap: false,
      },
      {
        range: {
          one: {
            lower: 4,
            upper: 5,
          },
          two: {
            lower: 4,
            upper: 8,
          },
        },
        overlap: true,
      },
      {
        range: {
          one: {
            lower: 4,
            upper: 5,
          },
          two: {
            lower: 3,
            upper: 8,
          },
        },
        overlap: true,
      },
      {
        range: {
          one: {
            lower: 4,
            upper: 8,
          },
          two: {
            lower: 4,
            upper: 8,
          },
        },
        overlap: true,
      },
      {
        range: {
          one: {
            lower: 6,
            upper: 8,
          },
          two: {
            lower: 4,
            upper: 8,
          },
        },
        overlap: true,
      },
      {
        range: {
          one: {
            lower: 4,
            upper: 9,
          },
          two: {
            lower: 4,
            upper: 8,
          },
        },
        overlap: true,
      },
      {
        range: {
          one: {
            lower: 5,
            upper: 9,
          },
          two: {
            lower: 4,
            upper: 8,
          },
        },
        overlap: false,
      },
    ])("range: $range overlaps: $overlap", ({ range, overlap }) => {
      expect(isCompleteOverlap(range)).toEqual(overlap);
    });
  });
  test("solution part 1", () => {
    expect(part1("3-4,2-5\n4-5,5-6")).toEqual(1);
  });
  test.each([
    {
      range: {
        one: {
          lower: 1,
          upper: 2,
        },
        two: {
          lower: 3,
          upper: 4,
        },
      },
      overlap: false,
    },
    {
      range: {
        one: {
          lower: 1,
          upper: 4,
        },
        two: {
          lower: 3,
          upper: 4,
        },
      },
      overlap: true,
    },
    {
      range: {
        one: {
          lower: 1,
          upper: 3,
        },
        two: {
          lower: 3,
          upper: 4,
        },
      },
      overlap: true,
    },
    {
      range: {
        one: {
          lower: 1,
          upper: 3,
        },
        two: {
          lower: 2,
          upper: 4,
        },
      },
      overlap: true,
    },
    {
      range: {
        one: {
          lower: 3,
          upper: 4,
        },
        two: {
          lower: 2,
          upper: 4,
        },
      },
      overlap: true,
    },
    {
      range: {
        one: {
          lower: 3,
          upper: 6,
        },
        two: {
          lower: 2,
          upper: 4,
        },
      },
      overlap: true,
    },
    {
      range: {
        one: {
          lower: 2,
          upper: 8,
        },
        two: {
          lower: 3,
          upper: 7,
        },
      },
      overlap: true,
    },
    {
      range: {
        one: {
          lower: 5,
          upper: 6,
        },
        two: {
          lower: 3,
          upper: 4,
        },
      },
      overlap: false,
    },
  ])("partial overlap detector", ({ range, overlap }) => {
    expect(isPartialOverlap(range)).toEqual(overlap);
  });
  test("solution part 2", () => {
    expect(part2("3-4,2-5\n4-5,5-6\n4-5,6-6")).toEqual(2);
  });
});
