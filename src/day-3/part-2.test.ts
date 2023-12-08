import { assertEquals } from "../../deps.ts";
import { testInput } from "./constants.ts";
import { part2 } from "./part-2.ts";

Deno.test("Part 2 works correctly", () => {
  assertEquals(part2(testInput), 467835);
});
