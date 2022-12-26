// export function baseOperation(operation: Operation): Operation {
//   return (old: number) => {
//     const o = operation(old);
//     return Math.floor(o / 3);
//   };
// }

export class Monkey {
  private _items: number[];
  private _inspectionCount: number;

  constructor(
    private config: MonkeyConfig,
    private throwTo: ({
      item,
      monkeyNumber,
    }: {
      item: number;
      monkeyNumber: number;
    }) => void,
    private worryDivisor: number
  ) {
    this._items = [...config.items];
    this._inspectionCount = 0;
  }
  takeTurn() {
    [...this._items]
      .map((item) =>
        Math.floor(
          operations[this.config.operation](
            item,
            this.config.operationValue === "old"
              ? item
              : this.config.operationValue
          ) / this.worryDivisor
        )
      )
      .forEach((item) => {
        const target =
          item % this.config.testDivisor === 0
            ? this.config.truthyTarget
            : this.config.falsyTarget;
        this.throwTo({
          item,
          monkeyNumber: target,
        });
      });
    this._inspectionCount += this._items.length;
    this._items = [];
  }
  catchItem(item: number) {
    this._items = [...this._items, item];
  }
  get inspectionCount() {
    return this._inspectionCount;
  }
  get monkeyNumber() {
    return this.config.monkeyNumber;
  }
}

const operations = {
  "*": (one: number, two: number) => one * two,
  "+": (one: number, two: number) => one + two,
  "-": (one: number, two: number) => one - two,
  "/": (one: number, two: number) => one / two,
};

export type Operation = "*" | "+" | "-" | "/";

export interface MonkeyConfig {
  monkeyNumber: number;
  items: number[];
  operation: Operation;
  operationValue: number | "old";
  testDivisor: number;
  truthyTarget: number;
  falsyTarget: number;
}

function monkeyParser(input: string): MonkeyConfig {
  const lines = input.split("\n");
  const monkeyNumber = Number(
    lines[0].substring("Monkey ".length, lines[0].length - 1)
  );
  const items = lines[1]
    .substring("  Starting items: ".length)
    .split(", ")
    .map(Number);
  const [operation, operationValueString] = lines[2]
    .substring("  Operation: new = old ".length)
    .split(" ");
  const testDivisor = Number(
    lines[3].substring("  test: divisible by ".length)
  );
  const truthyTarget = Number(
    lines[4].substring("    If true: throw to monkey ".length)
  );
  const falsyTarget = Number(
    lines[5].substring("    If false: throw to monkey ".length)
  );
  return {
    monkeyNumber,
    items,
    operation: operation as Operation,
    operationValue:
      operationValueString === "old" ? "old" : Number(operationValueString),
    testDivisor,
    truthyTarget,
    falsyTarget,
  };
}

export function inputParser(input: string): MonkeyConfig[] {
  const separator = "\n\n";
  const monkeys = input.split(separator);

  return monkeys.map(monkeyParser);
}

export function part1(input: string): number {
  let monkeys: Map<number, Monkey> = new Map();
  const throwTo = ({
    item,
    monkeyNumber,
  }: {
    item: number;
    monkeyNumber: number;
  }) => {
    monkeys.get(monkeyNumber)!.catchItem(item);
  };

  inputParser(input).forEach((config) => {
    monkeys.set(config.monkeyNumber, new Monkey(config, throwTo, 3));
  });

  for (let t = 0; t < 20; t++) {
    for (let monkey of monkeys.values()) {
      monkey.takeTurn();
    }
  }
  const monkeyArray = Array.from(monkeys.values()).sort(
    (a, b) => b.inspectionCount - a.inspectionCount
  );
  return monkeyArray[0].inspectionCount * monkeyArray[1].inspectionCount;
}

const interstingRounds = [
  1, 20, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000,
];
export function part2(input: string): number {
  let monkeys: Map<number, Monkey> = new Map();
  const throwTo = ({
    item,
    monkeyNumber,
  }: {
    item: number;
    monkeyNumber: number;
  }) => {
    monkeys.get(monkeyNumber)!.catchItem(item);
  };

  inputParser(input).forEach((config) => {
    monkeys.set(config.monkeyNumber, new Monkey(config, throwTo, 1));
  });

  for (let t = 0; t < 20; t++) {
    for (let monkey of monkeys.values()) {
      monkey.takeTurn();
    }
    if (interstingRounds.includes(t + 1)) {
    }
  }
  const monkeyArray = Array.from(monkeys.values()).sort(
    (a, b) => b.inspectionCount - a.inspectionCount
  );
  return monkeyArray[0].inspectionCount * monkeyArray[1].inspectionCount;
}
