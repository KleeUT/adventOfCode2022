interface Range {
  upper: number;
  lower: number;
}

interface Ranges {
  one: Range;
  two: Range;
}

export function parseInput(input: string): Ranges[] {
  return input.split("\n").map((line) => {
    const [one, two] = line.split(",").map((values) => {
      const [lower, upper] = values.split("-").map(Number);
      return {
        upper,
        lower,
      };
    });
    return { one, two };
  });
}

export function isCompleteOverlap(ranges: Ranges): boolean {
  if (
    ranges.one.lower <= ranges.two.lower &&
    ranges.one.upper >= ranges.two.upper
  ) {
    return true;
  }
  if (
    ranges.two.lower <= ranges.one.lower &&
    ranges.two.upper >= ranges.one.upper
  ) {
    return true;
  }
  return false;
}

export function isPartialOverlap(ranges: Ranges): boolean {
  if (
    ranges.one.upper >= ranges.two.lower &&
    ranges.one.upper <= ranges.two.upper
  ) {
    return true;
  }
  if (
    ranges.one.lower >= ranges.two.lower &&
    ranges.one.lower <= ranges.two.upper
  ) {
    return true;
  }
  if (
    ranges.one.lower <= ranges.two.lower &&
    ranges.one.upper >= ranges.two.upper
  ) {
    return true;
  }
  return false;
}

export function part1(input: string): number {
  return parseInput(input).filter(isCompleteOverlap).length;
}

export function part2(input: string): number {
  return parseInput(input).filter(isPartialOverlap).length;
}
