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
import { part1 as day7Part1, part2 as day7Part2 } from "./day7";

const days: {
  [key: string]: { [key: string]: (s: string) => number | string };
} = {
  day1: { "1": day1Part1, "2": day1Part2 },
  day2: { "1": day2Part1, "2": day2Part2 },
  day3: { "1": day3Part1, "2": day3Part2 },
  day4: { "1": day4Part1, "2": day4Part2 },
  day5: { "1": day5Part1, "2": day5Part2 },
  day6: { "1": day6Part1, "2": day6Part2 },
  day7: { "1": day7Part1, "2": day7Part2 },
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
if (!(input === "sample" || input === "input")) {
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
