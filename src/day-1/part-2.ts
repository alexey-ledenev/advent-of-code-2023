import { part1 } from "./part-1.ts";

const numberByWord = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
} as const;

const regexGroup = `([0-9]|${Object.keys(numberByWord).join("|")})`;

const parseNumber = (wordOrNumber: string): number => {
  if (wordOrNumber in numberByWord) {
    return numberByWord[wordOrNumber as keyof typeof numberByWord];
  }
  return Number.parseInt(wordOrNumber, 10);
};

const getLineValue = (line: string): number => {
  const regexFirst = new RegExp(`${regexGroup}.*$`, "g");
  const regexLast = new RegExp(`^.*${regexGroup}`, "g");

  const firstNumber = (regexFirst.exec(line) ?? [])[1] ?? 0;
  const lastNumber = (regexLast.exec(line) ?? [])[1] ?? 0;

  return parseNumber(firstNumber) * 10 + parseNumber(lastNumber);
};

export const part2 = (lines: string[]) => part1(lines, getLineValue);
