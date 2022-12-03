export function letterToPriority(letter: string): number {
  if (letter.length !== 1) {
    return 0;
  }
  const charCode = letter.charCodeAt(0);
  if (charCode < 97) {
    return charCode - 65 + 27;
  }
  return charCode - 96;
}

export function findDuplicate(input: string): string {
  const part1 = input.substring(0, input.length / 2);
  const part2 = input.substring(input.length / 2);
  for (let l of part1.split("")) {
    if (part2.includes(l)) {
      return l;
    }
  }
  throw new Error("Developer Mistake");
}

export function part1(input: string): number {
  return input
    .split("\n")
    .filter((x) => x)
    .reduce((total, line) => {
      return letterToPriority(findDuplicate(line)) + total;
    }, 0);
}

export function findDuplicateInGroup([one, two, three]: string[]): string {
  for (let l of one) {
    if (two.includes(l) && three.includes(l)) {
      return l;
    }
  }
  throw new Error("Developer Mistake");
}

export function part2(input: string): number {
  const lines = input.split("\n");
  const groups: string[][] = [];
  for (let i = 0; i < lines.length; i += 3) {
    groups.push([lines[i], lines[i + 1], lines[i + 2]]);
  }
  return groups.reduce((total, group) => {
    return letterToPriority(findDuplicateInGroup(group)) + total;
  }, 0);
}
