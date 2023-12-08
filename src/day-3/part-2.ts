import { getLineNumbers } from "./part-1.ts";

const multiply = (a: number, b: number) => a * b;
const sum = (a: number, b: number) => a + b;

const lineNumbersCache = new Map<number, ReturnType<typeof getLineNumbers>>();
const getLineNumbersWithCache = (line: string, lineIdx: number) => {
  if (lineNumbersCache.has(lineIdx) === false) {
    lineNumbersCache.set(lineIdx, getLineNumbers(line));
  }
  return lineNumbersCache.get(lineIdx)!;
};

const calcHorizontal = (line: string, lineIdx: number, gearIdx: number) => {
  const currentLineNumbers = getLineNumbersWithCache(line, lineIdx);
  return currentLineNumbers.reduce<number[]>((a, number) => {
    if (gearIdx === number.endIndex || gearIdx === number.index - 1) {
      a.push(number.value);
    }
    return a;
  }, []);
};

const calcVertical = (line: string, lineIdx: number, gearIdx: number) => {
  const verticalLineNumbers = getLineNumbersWithCache(line, lineIdx);
  return verticalLineNumbers.reduce<number[]>((a, number) => {
    if (gearIdx >= number.index - 1 && gearIdx <= number.endIndex) {
      a.push(number.value);
    }
    return a;
  }, []);
};

const getLineGearRatios = (line: string, lineIdx: number, lines: string[]) => {
  const ratios: number[] = [];

  const charCount = line.length;
  for (let i = 0; i < charCount; i++) {
    if (line[i] === "*") { // is gear symbol
      let neighbors = calcHorizontal(line, lineIdx, i);

      if (lineIdx > 0) {
        neighbors = [
          ...neighbors,
          ...calcVertical(lines[lineIdx - 1], lineIdx - 1, i),
        ];
      }

      if (lineIdx < lines.length - 1) {
        neighbors = [
          ...neighbors,
          ...calcVertical(lines[lineIdx + 1], lineIdx + 1, i),
        ];
      }

      if (neighbors.length === 2) {
        ratios.push(neighbors.reduce(multiply, 1));
      }
    }
  }

  return ratios;
};

const addLineToSum = (
  res: number,
  line: string,
  lineIdx: number,
  lines: string[],
) => {
  const lineRatios = getLineGearRatios(line, lineIdx, lines);
  return res + lineRatios.reduce(sum, 0);
};

export const part2 = (lines: string[]) => lines.reduce(addLineToSum, 0);
