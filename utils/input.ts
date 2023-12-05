export const readDataFromFile = (filePath: string) =>
  Deno.readTextFile(filePath);

export const readLinesFromFile = async (filePath: string) => {
  const data = await readDataFromFile(filePath);
  const lines = data.split(/\r?\n/);

  if (lines[lines.length - 1] === "") {
    lines.pop();
  }
  return lines;
};

export const readNumbersFromFile = async (filePath: string) => {
  const lines = await readLinesFromFile(filePath);
  return lines.map(Number);
};
