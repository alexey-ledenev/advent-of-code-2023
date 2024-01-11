import { Mapping, parseMaps } from "./part-1.ts";

type Range = [Mapping["sourceId"], Mapping["rangeLength"]];

const parseSeeds = (line: string) => {
  const [_, ids] = line.split(":");
  const rawRanges = ids.trim().split(" ");
  if (rawRanges.length < 2) return [];

  const ranges: Range[] = [];
  for (let i = 0; i < rawRanges.length; i += 2) {
    const rangeStart = +rawRanges[i];
    const rangeLength = +rawRanges[i + 1];
    ranges.push([rangeStart, rangeLength]);
  }
  return ranges;
};

const getMapSourceRange = (map: Mapping): Range => [
  map.sourceId,
  map.rangeLength,
];
const getMapOffset = (map: Mapping) => map.destinationId - map.sourceId;

// exclusive
const getRangeLastIndex = ([start, length]: Range) => start + length;
const getRangeByStartAndLastIndex = (
  start: number,
  lastIndex: number,
): Range => [start, lastIndex - start];

export const getRangeIntersection = (
  r1: Range,
  r2: Range,
): Range | undefined => {
  const start = Math.max(r1[0], r2[0]);
  const end = Math.min(getRangeLastIndex(r1), getRangeLastIndex(r2));
  return start < end ? getRangeByStartAndLastIndex(start, end) : undefined;
};

export const subtractRanges = (
  subtractFrom: Range,
  toSubtract: Range,
): Range[] => {
  const res: Range[] = [];

  const sourceEnd = getRangeLastIndex(subtractFrom);

  // if the source starts to the left of the excluded range
  if (subtractFrom[0] < toSubtract[0]) {
    // what's to the left: the end of the source or the beginning of the excluded range?
    res.push(getRangeByStartAndLastIndex(
      subtractFrom[0],
      Math.min(toSubtract[0], sourceEnd),
    ));
  }

  const excludeEnd = getRangeLastIndex(toSubtract);

  // if the source ends to the right of the excluded range
  if (sourceEnd > excludeEnd) {
    res.push(getRangeByStartAndLastIndex(
      Math.max(excludeEnd, subtractFrom[0]),
      sourceEnd,
    ));
  }

  return res;
};

const transformRanges = (ranges: Range[], maps: Mapping[]) => {
  const currentRanges: Range[] = [];

  while (ranges.length > 0) {
    const range = ranges.pop()!;

    let hasIntersection = false;

    for (const map of maps) {
      const intersection = getRangeIntersection(range, getMapSourceRange(map));
      if (intersection !== undefined) {
        hasIntersection = true;

        currentRanges.push([
          intersection[0] + getMapOffset(map),
          intersection[1],
        ]);

        for (const unchanged of subtractRanges(range, intersection)) {
          ranges.push(unchanged);
        }

        break;
      }
    }

    if (hasIntersection === false) {
      currentRanges.push(range);
    }
  }

  return currentRanges;
};

const getMinRangeStart = (a: number, [i]: Range) => i < a ? i : a;

export const part2 = ([seedsLine, ...mapLines]: string[]): number => {
  const seeds = parseSeeds(seedsLine) ?? [];
  const maps = parseMaps(mapLines);

  const finalRanges = maps.reduce(transformRanges, seeds);

  return finalRanges.reduce(getMinRangeStart, finalRanges[0]?.[0] ?? 0);
};
