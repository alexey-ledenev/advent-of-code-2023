import { parseSet } from "./part-1.ts";

const multiply = (a: number, b: number) => a * b;

const updateMax = (max: Record<string, number>, setRaw: string) => {
  const set = parseSet(setRaw);

  const checkAndUpdate = (value: number, key: string) => {
    if (max[key] === undefined || max[key] < value) {
      max[key] = value;
    }
  };

  set.forEach(checkAndUpdate);

  return max;
};

export const getLinePower = (line: string) => {
  const setsRaw = line.split(":")[1] ?? "";

  const requiredAmounts = setsRaw.trim().split(";").reduce(
    updateMax,
    Object.create(null),
  );

  return Object.values(requiredAmounts).reduce(multiply, 1);
};

const sumWithLinePower = (sum: number, line: string) =>
  sum + getLinePower(line);

export const part2 = (lines: string[]) => lines.reduce(sumWithLinePower, 0);
