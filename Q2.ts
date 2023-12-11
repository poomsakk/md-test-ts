function getQuestionPart(phrases: string[]): string[] {
  const sortedPhrases: string[] = [...phrases].sort((a, b) => a.length - b.length);
  const firstWord: string = sortedPhrases[0];
  const len: number = firstWord.length;
  let dupWord: string = "";
  for (let start = 0; start < len; start++) {
    for (let end = start + 1; end < len + 1; end++) {
      const sliceWord: string = firstWord.slice(start, end);
      if (sortedPhrases.every((w) => w.includes(sliceWord))) {
        if (sliceWord.length > dupWord.length) {
          dupWord = sliceWord;
        }
      }
    }
  }
  return phrases.map((w) => w.replace(dupWord, "").trim());
}