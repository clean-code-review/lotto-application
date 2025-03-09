export const pickRandomNumber = (minNum: number, maxNum: number) => {
  const number = Math.floor(Math.random() * (maxNum - minNum) + minNum);

  return number;
};
