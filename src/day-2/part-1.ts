import { MAX_ITEMS } from "./constants.ts";

export const parseSet = (set: string) => {
  const setCubes = set.trim().split(",");
  return setCubes.reduce((map, items) => {
    const [countRaw, i] = items.trim().split(" ");

    map.set(i.trim(), Number.parseInt(countRaw, 10));

    return map;
  }, new Map<string, number>());
};

export const parseLine = (line: string) => {
  const [idRaw, setsRaw] = line.split(":");
  const gameId = idRaw.split(" ")[1].trim();
  const sets = setsRaw.trim().split(";");

  return [
    Number.parseInt(gameId, 10),
    sets.map(parseSet),
  ] as const;
};

export const part1 = (
  lines: string[],
  maxItems: Record<string, number> = MAX_ITEMS,
): number => {
  const maxValues = Object.entries(maxItems);

  const isMaximumReached = (items: Map<string, number>) => {
    const isCountInvalid = ([k, v]: [string, number]) => {
      const count = items.get(k);
      return count !== undefined && count > v;
    };
    return maxValues.some(isCountInvalid);
  };

  const calcImpossibleIdsSum = (sum: number, line: string) => {
    const [gameId, sets] = parseLine(line);
    const isImpossible = sets.some(isMaximumReached);

    if (isImpossible === false) {
      sum += gameId;
    }

    return sum;
  };

  return lines.reduce(calcImpossibleIdsSum, 0);
};
