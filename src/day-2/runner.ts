import { dirname, fromFileUrl } from "../../deps.ts";
import { readLinesFromFile } from "../../utils/input.ts";
import { part1 } from "./part-1.ts";

export const run = async (currentPath: string) => {
  const input = await readLinesFromFile(`${currentPath}/input.txt`);

  console.log(`Part 1: ${part1(input)}`);
};

run(dirname(fromFileUrl(new URL(import.meta.url))));
