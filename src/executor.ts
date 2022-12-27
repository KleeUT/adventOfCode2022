import { readFile } from "fs/promises";
import path from "path";

import { solution as day1Part1, solution2 as day1Part2 } from "./day1";
import {
  calculateResult as day2Part1,
  calculateResult2 as day2Part2,
} from "./day2";
import { part1 as day3Part1, part2 as day3Part2 } from "./day3";
import { part1 as day4Part1, part2 as day4Part2 } from "./day4";
import { part1 as day5Part1, part2 as day5Part2 } from "./day5";
import { part1 as day6Part1, part2 as day6Part2 } from "./day6";
import { part1 as day8Part1, part2 as day8Part2 } from "./day8";
import { part1 as day9Part1, part2 as day9Part2 } from "./day9";
import { part1 as day10Part1, part2 as day10Part2 } from "./day10";
import { part1 as day11Part1, part2 as day11Part2 } from "./day11";
import { part1 as day12Part1, part2 as day12Part2 } from "./day12";
import { part1 as day13Part1, part2 as day13Part2 } from "./day13";

const days: {
  [key: string]: { [key: string]: (s: string) => unknown };
} = {
  day1: { "1": day1Part1, "2": day1Part2 },
  day2: { "1": day2Part1, "2": day2Part2 },
  day3: { "1": day3Part1, "2": day3Part2 },
  day4: { "1": day4Part1, "2": day4Part2 },
  day5: { "1": day5Part1, "2": day5Part2 },
  day6: { "1": day6Part1, "2": day6Part2 },
  day8: { "1": day8Part1, "2": day8Part2 },
  day9: { "1": day9Part1, "2": day9Part2 },
  day10: { "1": day10Part1, "2": day10Part2 },
  day11: { "1": day11Part1, "2": day11Part2 },
  day12: { "1": day12Part1, "2": day12Part2 },
  day13: { "1": day13Part1, "2": day13Part2 },
};

const [_node, _path, day, part, input] = process.argv;

if (!day) {
  console.log("missing 1st argument for day");
  process.exit();
}
if (!(part === "1" || part === "2")) {
  console.log("Missing 2nd argument");
  process.exit();
}
if (!(input === "sample" || input === "input" || input === "test")) {
  console.log("missing 3rd argument for input, must be sample or input");
  process.exit();
}

async function execute() {
  const file = await readFile(
    path.join(__dirname, `day${day}`, `${input}.txt`),
    "utf-8"
  );
  const out = days[`day${day}`][part](file);
  console.log(out);
}

execute();
