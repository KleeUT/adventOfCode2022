export type Packet = number | number[];
export type PacketPair = {
  first: Packet[];
  second: Packet[];
};

export type Signal = PacketPair[];

export enum PacketOrder {
  Correct = "Correct",
  Incorrect = "Incorrect",
}

export enum ComparisonResult {
  Correct = "Correct",
  Incorrect = "Incorrect",
  Inconclusive = "Inconclusive",
}

const emptyPacket: () => Partial<PacketPair> = () => ({
  first: undefined,
  second: undefined,
});

export function parseInput(input: string): Signal {
  const lines = input.split("\n");
  return lines.reduce(
    (packets, line) => {
      const lastPacket = packets.at(-1)!;
      if (line === "") {
        packets.push(emptyPacket());
        return packets;
      }
      if (!lastPacket.first) {
        lastPacket.first = JSON.parse(line);
      } else {
        lastPacket.second = JSON.parse(line);
      }
      return packets;
    },
    [emptyPacket()]
  ) as PacketPair[];
}

// function verifyPackets(first: Packet, second: Packet): boolean {
//   const firstIsArray = Array.isArray(first);
//   const secondIsArray = Array.isArray(second);
//   if (firstIsArray && secondIsArray) {
//     if (first.length > second.length) {
//       return false;
//     }
//     return verifyPair({
//       first: first,
//       second: second,
//     });
//   }
//   if (firstIsArray || secondIsArray) {
//     const aFirst = firstIsArray ? first : [first];
//     const aSecond = secondIsArray ? second : [second];
//     return aFirst[0] <= aSecond[0];
//   }
//   // console.log("Comparing", { first, second, result: first <= second });
//   if (second === undefined) {
//     return true;
//   }
//   return first <= second;
// }

function verifyPackets(first: Packet, second: Packet): ComparisonResult {
  if (second === undefined) {
    return ComparisonResult.Incorrect;
  }
  if (typeof first === "number" && typeof second === "number") {
    if (first < second) {
      return ComparisonResult.Correct;
    } else if (first > second) {
      return ComparisonResult.Incorrect;
    }
    return ComparisonResult.Inconclusive;
  }
  const firstIsArray = Array.isArray(first);
  const secondIsArray = Array.isArray(second);
  return verifyPair({
    first: firstIsArray ? first : [first],
    second: secondIsArray ? second : [second],
  });
}

function verifyPair(pair: PacketPair): ComparisonResult {
  for (let i = 0; i < pair.first.length; i++) {
    const result = verifyPackets(pair.first[i], pair.second[i]);
    if (result !== ComparisonResult.Inconclusive) {
      return result;
    }
  }
  if (pair.first.length < pair.second.length) {
    return ComparisonResult.Correct;
  }
  return ComparisonResult.Inconclusive;
}

export function comparePacketPair(pair: PacketPair): PacketOrder {
  return verifyPair(pair) === ComparisonResult.Correct
    ? PacketOrder.Correct
    : PacketOrder.Incorrect;
}

export function part1(input: string): number {
  return parseInput(input).reduce((sum, pair, index) => {
    switch (comparePacketPair(pair)) {
      case PacketOrder.Correct:
        console.log(`Correct at position ${index + 1}`);
        return sum + index + 1;
      case PacketOrder.Incorrect:
        return sum;
    }
  }, 0);
}

export function part2(input: string): number {
  return 0;
}
