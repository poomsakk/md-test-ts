function minEnergy(
  start: number,
  shops: number[],
  stations: number[],
  target: number
): number {
  const n: number = Math.max(...shops, ...stations, target) + 1;
  // Setup adjacency matrix using Floyd-Warshall algorithm
  let arr: number[][] = new Array(n)
    .fill(0)
    .map(() => new Array(n).fill(Infinity));
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      arr[i][i] = 0;
      if (i + 1 < n) arr[i][i + 1] = 1;
      if (i - 1 >= 0) arr[i][i - 1] = 1;
    }
  }
  for (let i = 0; i < stations.length; i++) {
    for (let j = 0; j < stations.length; j++) {
      const x = stations[i];
      const y = stations[j];
      if (x + 1 < n) arr[x][x + 1] = 1;
      if (x - 1 >= 0) arr[x][x - 1] = 1;
      arr[x][y] = 0;
    }
  }

  // Update adjacency matrix using Floyd-Warshall algorithm
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        arr[i][j] = Math.min(arr[i][j], arr[i][k] + arr[k][j]);
      }
    }
  }

  const permutator = (inputArr: number[]): number[][] => {
    let result: number[][] = [];
    const permute = (arr: number[], m: number[] = []) => {
      if (arr.length === 0) {
        result.push(m);
      } else {
        for (let i = 0; i < arr.length; i++) {
          let curr = [...arr];
          let next = curr.splice(i, 1);
          permute([...curr], m.concat(next));
        }
      }
    };
    permute(inputArr);
    return result;
  };

  let minEnergy: number = Infinity;
  let permutedShops = permutator(shops).map((element) => [
    start,
    ...element,
    target,
  ]);

  permutedShops.forEach((element) => {
    let sum = 0;
    for (let i = 0; i < element.length - 1; i++) {
      sum += arr[element[i]][element[i + 1]];
    }
    minEnergy = Math.min(minEnergy, sum);
  });

  return minEnergy;
}