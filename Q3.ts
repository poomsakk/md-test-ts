function quickestPath(board: {
  ladders: [number, number][];
  snakes: [number, number][];
}): number[] {
  //preparing the board
  const rollsCount: number = 100;
  let arrMap: number[] = [];
  for (let i = 1; i <= 100; i++) {
    arrMap[i] = i;
  }
  board.ladders.forEach((ladder) => {
    arrMap[ladder[0]] = ladder[1];
  });
  board.snakes.forEach((snake) => {
    arrMap[snake[0]] = snake[1];
  });

  const memo: { [key: string]: number[] } = {};
  const permute = (
    remainingDice: number,
    currentPosition: number = 1,
    currentPath: number[] = []
  ): number[] => {
    const key = `${remainingDice}_${currentPosition}`;
    if (memo[key]){
      return memo[key];
    }
    if (remainingDice < 0){
      return [];
    }
    if (currentPosition === 100){
      return currentPath;
    }
    if (currentPosition > 100){
      memo[key] = [];
      return [];
    }

    for (let i = 1; i <= 6; i++) {
      const result = permute(remainingDice - 1, arrMap[currentPosition + i], [
        ...currentPath,
        i,
      ]);
      if (result.length !== 0) {
        memo[key] = result;
        return result;
      }
    }
    memo[key] = [];
    return [];
  };

  let resultPath: number[];
  for (let i = 1; i < rollsCount; i++) {
    resultPath = permute(i);
    if (resultPath.length !== 0) {
      return resultPath;
    }
  }
  return [];
}