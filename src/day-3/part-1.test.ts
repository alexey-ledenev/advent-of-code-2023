import { assertEquals } from "../../deps.ts";
import { part1 } from "./part-1.ts";

const lines = [
  "467..114..",
  "...*......",
  "..35..633.",
  "......#...",
  "617*......",
  ".....+.58.",
  "..592.....",
  "......755.",
  "...$.*....",
  ".664.598..",
];

Deno.test("Part 1 works correctly", () => {
  assertEquals(part1(lines), 4361);
});
