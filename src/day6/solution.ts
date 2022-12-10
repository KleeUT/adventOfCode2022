interface Marker {
  signals: string[];
  startIndex: number;
}
export function part1(input: string): number {
  const signals = input.split("");
  let markerSignals: string[] = [];
  let startIndex = 0;
  for (let signal of signals) {
    const duplicateIndex = markerSignals.indexOf(signal);
    if (duplicateIndex !== -1) {
      // remove before index
      markerSignals = markerSignals.slice(duplicateIndex + 1);
      markerSignals.push(signal);
    } else if (markerSignals.length !== 3) {
      markerSignals = [...markerSignals, signal];
    } else {
      return startIndex + 1;
    }

    startIndex++;
  }

  return -1;
}

export function part2(input: string): number {
  const signals = input.split("");
  let markerSignals: string[] = [];
  let startIndex = 0;
  for (let signal of signals) {
    const duplicateIndex = markerSignals.indexOf(signal);
    if (duplicateIndex !== -1) {
      // remove before index
      markerSignals = markerSignals.slice(duplicateIndex + 1);
      markerSignals.push(signal);
    } else if (markerSignals.length !== 13) {
      markerSignals = [...markerSignals, signal];
    } else {
      return startIndex + 1;
    }

    startIndex++;
  }

  return -1;
}
