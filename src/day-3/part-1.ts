const numberRegex = /\d+/g;
const symbolRegex = /[^.\d]/g;

const hasSymbol = (s: string) => s.match(symbolRegex);

const getLineNumbers = (line: string) => {
  const result = [];

  let match: RegExpExecArray | null = null;
  while ((match = numberRegex.exec(line)) !== null) {
    result.push({
      value: +match[0],
      index: match.index,
      endIndex: match.index + match[0].length,
    });
  }

  return result;
};

const hasLeftSymbol = (line: string, startIndex: number) =>
  startIndex > 0 && hasSymbol(line[startIndex - 1]);
const hasRightSymbol = (line: string, endIndex: number) =>
  endIndex < line.length && hasSymbol(line[endIndex]);

const hasVerticalSymbol = (
  line: string,
  startIndex: number,
  endIndex: number,
) =>
  hasSymbol(
    line.substring(
      Math.max(0, startIndex - 1),
      Math.min(line.length, endIndex + 1),
    ),
  );

const getLineSum = (line: string, lineIdx: number, lines: string[]) => {
  const numbers = getLineNumbers(line);
  return numbers.reduce((sum, number) => {
    if (
      hasLeftSymbol(line, number.index) ||
      hasRightSymbol(line, number.endIndex) ||
      (lineIdx > 0 &&
        hasVerticalSymbol(lines[lineIdx - 1], number.index, number.endIndex)) ||
      (lineIdx < lines.length - 1 &&
        hasVerticalSymbol(lines[lineIdx + 1], number.index, number.endIndex))
    ) {
      sum += number.value;
    }

    return sum;
  }, 0);
};

const addLineToSum = (
  sum: number,
  line: string,
  lineIdx: number,
  lines: string[],
) => {
  return sum + getLineSum(line, lineIdx, lines);
};

export const part1 = (lines: string[]) => lines.reduce(addLineToSum, 0);
