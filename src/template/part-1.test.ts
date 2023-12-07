import { assertEquals } from "../../deps.ts";
import { part1 } from "./part-1.ts";

Deno.test("Part 1 works correctly", () => {
  assertEquals(part1([]), 0);
});
