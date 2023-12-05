const getLineValue = (line: string): number => {
  const charsCount = line.length;
  const numbers: number[] = [];

  for (let i = 0; i < charsCount; i++) {
    const maybeNumber = Number.parseInt(line[i], 10);
    if (Number.isNaN(maybeNumber) === false) {
      numbers.push(maybeNumber);
    }
  }

  if (numbers.length === 0) {
    return 0;
  }
  return Number.parseInt(`${numbers[0]}${numbers[numbers.length - 1]}`, 10);
};

export const part1 = (
  lines: string[],
  lineValueParser = getLineValue,
): number => {
  const calc = (sum: number, line: string) => lineValueParser(line) + sum;
  return lines.reduce(calc, 0);
};
