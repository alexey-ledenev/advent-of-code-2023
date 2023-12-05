import { assertEquals } from "../../deps.ts";
import { part1 } from "./part-1.ts";

const lines = [
  "1abc2",
  "pqr3stu8vwx",
  "a1b2c3d4e5f",
  "treb7uchet",
];

Deno.test("Part 1 works correctly", () => {
  assertEquals(part1(lines), 142);
});
