export function solution(input: string): number {
  const lines = input.split("\n").map((x) => x.trim());
  const agg = lines.reduce(
    (values, line) => {
      if (line) {
        values.current += Number(line);
      } else {
        if (values.current > values.max) {
          values.max = values.current;
        }
        values.current = 0;
      }
      return values;
    },
    { max: 0, current: 0 }
  );
  return agg.max;
}
export function solution2(input: string): number {
  const lines = input.split("\n").map((x) => x.trim());
  const agg = lines.reduce(
    (values, line) => {
      if (line) {
        values.current += Number(line);
      } else {
        const newValues = [...values.max, values.current];
        newValues.sort((a, b) => b - a);

        values.max = newValues.slice(0, 3);
        values.current = 0;
      }
      return values;
    },
    { max: [0, 0, 0], current: 0 }
  );
  const newValues = [...agg.max, agg.current];
  newValues.sort((a, b) => b - a);

  const max = newValues.slice(0, 3);
  return max.reduce((p, c) => p + c, 0);
}
