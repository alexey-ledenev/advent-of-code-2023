import { assertEquals } from "../../deps.ts";
import { part2 } from "./part-2.ts";

const lines = [
  "two1nine",
  "eightwothree",
  "abcone2threexyz",
  "xtwone3four",
  "4nineeightseven2",
  "zoneight234",
  "7pqrstsixteen",
];

Deno.test("Part 2 works correctly", () => {
  assertEquals(part2(lines), 281);
});
