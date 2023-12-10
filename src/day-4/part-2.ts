import { getCardSucceedCount, parseLineCard } from "./part-1.ts";

const calcCardsCount = (
  cards: Map<number, number>,
  line: string,
  idx: number,
) => {
  const cardId = idx + 1;
  const copies = cards.get(cardId) ?? 0;
  cards.set(cardId, copies + 1);

  const card = parseLineCard(line);
  const succeedCount = getCardSucceedCount(card);

  if (succeedCount !== 0) {
    const nextCardId = cardId + 1;
    for (let i = nextCardId; i < nextCardId + succeedCount; i++) {
      const existed = cards.get(i) ?? 0;
      cards.set(i, existed + 1 + copies);
    }
  }

  return cards;
};

export const part2 = (lines: string[]) => {
  const cards = lines.reduce(calcCardsCount, new Map<number, number>());
  let sum = 0;
  cards.forEach((count) => (sum += count));
  return sum;
};
