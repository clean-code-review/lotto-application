import { LOTTO_CONFIG } from '../constants';

/**
 * 1-45 사이에 중복되지 않는 로또 번호를 생성합니다.
 */
export const generateLottoNumbers = (): number[] => {
  const numbers = new Set<number>();

  while (numbers.size < LOTTO_CONFIG.NUMBERS_COUNT) {
    const randomNumber =
      Math.floor(
        Math.random() * (LOTTO_CONFIG.MAX_NUMBER - LOTTO_CONFIG.MIN_NUMBER + 1)
      ) + LOTTO_CONFIG.MIN_NUMBER;
    numbers.add(randomNumber);
  }

  return Array.from(numbers).sort((a, b) => a - b);
};

/**
 * count 개수만큼 로또 번호를 생성합니다.
 */
export const generateMultipleLottoNumbers = (count: number): number[][] => {
  return Array.from({ length: count }, () => generateLottoNumbers());
};
