export type InstructionResult = {
  cycle: number;
  registerValue: number;
};

export const NOOP = "noop";
export function processInstruction(
  instruction: string,
  currentResults: InstructionResult
): InstructionResult {
  const { cycle, registerValue } = currentResults;
  if (instruction === NOOP) {
    return {
      cycle: cycle + 1,
      registerValue,
    };
  }
  const [_addX, value] = instruction.split(" ");
  if (cycle < 30) {
    console.log({
      instruction,
      registerValue,
      newValue: registerValue + Number(value),
      cycle: cycle + 2,
    });
  }
  return {
    cycle: cycle + 2,
    registerValue: registerValue + Number(value),
  };
}

export type InterestingResult = {
  cycle: number;
  registerValue: number;
};
export function identifyInterestingResults(
  previousResult: InstructionResult | undefined,
  nextResult: InstructionResult
): InstructionResult | false {
  if (!previousResult) {
    return false;
  }
  let modulo = 40;
  let addIndex = 20;
  if (nextResult.cycle < 30) {
    modulo = 20;
    addIndex = 0;
  }

  const prev = (previousResult.cycle + addIndex) % modulo;
  const next = (nextResult.cycle + addIndex) % modulo;
  // if (next === 0) {
  //   return {
  //     ...nextResult,
  //   };
  // }
  if (prev > next) {
    return {
      cycle: nextResult.cycle - next,
      registerValue: previousResult.registerValue,
    };
  }
  return false;
}

export function calculateAnswersFromInterestingResults(
  results: InterestingResult[]
): number {
  return results.reduce((p, c) => p + c.cycle * c.registerValue, 0);
}

export function part1(input: string): number {
  const lines = input.split("\n");
  console.log(lines.length);
  const results = lines.reduce(
    (values, line) => [
      ...values,
      processInstruction(line, values.at(-1) || { cycle: 0, registerValue: 1 }),
    ],
    [] as InstructionResult[]
  );
  console.log(results.length);
  const interesting = results.reduce((interesting, result, index, array) => {
    let r = identifyInterestingResults(array[index - 1], result);
    if (!r) {
      return interesting;
    }
    return [...interesting, r];
  }, [] as InterestingResult[]);
  console.log(interesting);
  return calculateAnswersFromInterestingResults(interesting);
}

export function part2(input: string): number {
  return 0;
}
