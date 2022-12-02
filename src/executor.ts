import { readFile } from "fs/promises";
import path from "path";

import { solution as day1Part1, solution2 as day1Part2 } from "./day1";
import {
  calculateResult as day2Part1,
  calculateResult2 as day2Part2,
} from "./day2";

const days: { [key: string]: { [key: string]: (s: string) => number } } = {
  day1: { "1": day1Part1, "2": day1Part2 },
  day2: { "1": day2Part1, "2": day2Part2 },
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
