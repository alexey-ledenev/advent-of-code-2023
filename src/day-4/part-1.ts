export type Card = {
  winning: Map<number, number>;
  current: number[];
};

const toNumber = (n: string) => +n.trim();

const setWinningMap = (map: Card["winning"], value: string) => {
  if (value.length !== 0) {
    const num = toNumber(value);
    map.set(num, num);
  }
  return map;
};

const setCurrentList = (list: Card["current"], value: string) => {
  if (value.length !== 0) {
    list.push(toNumber(value));
  }
  return list;
};

export const parseLineCard = (line: string): Card => {
  const numbers = line.split(":")[1].trim();
  const [winning, current] = numbers.split("|");
  return {
    winning: winning.trim().split(" ").reduce(
      setWinningMap,
      new Map<number, number>(),
    ),
    current: current.trim().split(" ").reduce(setCurrentList, []),
  };
};

export const getCardSucceedCount = (card: Card) => {
  const calcSucceedCount = (count: number, current: number) => {
    if (card.winning.has(current)) {
      return count + 1;
    }
    return count;
  };
  return card.current.reduce(calcSucceedCount, 0);
};

const calcCardPoints = (card: Card) => {
  const count = getCardSucceedCount(card);

  let points = 0;
  for (let i = 0; i < count; i++) {
    if (i === 0) {
      points += 1;
    } else {
      points *= 2;
    }
  }

  return points;
};

const calcLine = (pointsSum: number, line: string) => {
  const card = parseLineCard(line);
  return pointsSum + calcCardPoints(card);
};

export const part1 = (lines: string[]) => lines.reduce(calcLine, 0);
