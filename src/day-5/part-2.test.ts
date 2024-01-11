import { assertEquals } from "../../deps.ts";
import { testInput } from "./constants.ts";
import { getRangeIntersection, part2, subtractRanges } from "./part-2.ts";

Deno.test("Part 2 works correctly", () => {
  assertEquals(getRangeIntersection([10, 5], [13, 7]), [13, 2]);
  assertEquals(getRangeIntersection([10, 5], [0, 12]), [10, 2]);
  assertEquals(getRangeIntersection([10, 5], [10, 5]), [10, 5]);
  assertEquals(getRangeIntersection([10, 5], [0, 5]), undefined);
  assertEquals(getRangeIntersection([10, 5], [20, 5]), undefined);

  assertEquals(subtractRanges([10, 5], [13, 7]), [[10, 3]]);
  assertEquals(subtractRanges([10, 5], [0, 12]), [[12, 3]]);
  assertEquals(subtractRanges([10, 5], [10, 5]), []);
  assertEquals(subtractRanges([10, 5], [0, 5]), [[10, 5]]);
  assertEquals(subtractRanges([10, 5], [20, 5]), [[10, 5]]);

  assertEquals(part2(testInput), 46);
});
