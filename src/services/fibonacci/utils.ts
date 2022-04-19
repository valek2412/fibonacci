export const getFibonacci = (n: number): number => {
  if (n == 0) return 0;
  if (n == 1) return 1;

  let prevPrev = 0;
  let prev = 1;
  let result = 0;

  for (let i = 2; i <= n; i++)
  {
    result = prev + prevPrev;
    prevPrev = prev;
    prev = result;
  }

  return result;
};
