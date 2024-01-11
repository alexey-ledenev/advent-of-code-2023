export type Mapping = {
  destinationId: number;
  sourceId: number;
  rangeLength: number;
};

const SEEDS_NAME = "seeds";

const parseNumbers = (numbers: string) => numbers.trim().split(" ").map(Number);

const parseSeedsLine = (line: string) => {
  const [name, ids] = line.split(":");

  if (name?.trim() !== SEEDS_NAME) return undefined;

  return parseNumbers(ids);
};

const parseMapLine = (line: string) => {
  if (line.trim().length === 0) return undefined;

  const [mapNameOrIds, divider] = line.split("map");

  // line is a string like "seed-to-soil map:"
  if (divider === ":") {
    return mapNameOrIds.trim();
  }

  // line is a string like "50 98 2"
  return parseNumbers(mapNameOrIds);
};

export const parseMaps = (mapLines: string[]) => {
  const { maps } = mapLines.reduce((a, line, idx) => {
    const lineData = parseMapLine(line);

    if (lineData !== undefined) {
      if (typeof lineData === "string") {
        if (a.currentMap !== undefined) {
          a.maps.push(a.currentMap);
        }
        a.currentMap = [];
      } else if (a.currentMap !== undefined) {
        const [destinationId, sourceId, rangeLength] = lineData;
        a.currentMap.push({
          destinationId,
          sourceId,
          rangeLength,
        });
      }
    }

    if (a.currentMap !== undefined && idx === mapLines.length - 1) {
      a.maps.push(a.currentMap);
    }

    return a;
  }, {
    maps: [] as Mapping[][],
    currentMap: undefined as Mapping[] | undefined,
  });

  return maps;
};

const parseLines = ([seedsLine, ...mapLines]: string[]) => {
  const seeds = parseSeedsLine(seedsLine) ?? [];
  const maps = parseMaps(mapLines);
  return { seeds, maps };
};

const getSeedsLocations = (seeds: number[], maps: Mapping[][]) => {
  const seedToLocation = (seedId: number) => {
    let id = seedId;

    for (const map of maps) {
      const mapped = map.find((m) =>
        id >= m.sourceId && id < m.sourceId + m.rangeLength
      );
      id = mapped !== undefined
        ? mapped.destinationId + (id - mapped.sourceId)
        : id;
    }

    return id;
  };

  return seeds.map(seedToLocation);
};

export const part1 = (lines: string[]) => {
  const { seeds, maps } = parseLines(lines);
  const locations = getSeedsLocations(seeds, maps);
  return Math.min(...locations);
};
