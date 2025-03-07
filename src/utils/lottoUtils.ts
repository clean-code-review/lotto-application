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

/**
 * 당첨 번호와 보너스 번호를 생성합니다.
 */
export function generateWinningNumbers(): { numbers: number[]; bonus: number } {
  const mainNumbers = generateLottoNumbers();
  let bonus: number;

  do {
    bonus = Math.floor(Math.random() * 45) + 1;
  } while (mainNumbers.includes(bonus));

  return { numbers: mainNumbers, bonus };
}

/**
 * 로또 번호와 당첨 번호를 비교하여 일치하는 숫자의 개수를 반환합니다.
 */
export function checkMatches(
  ticket: number[],
  winningNumbers: number[]
): number {
  return ticket.filter((num) => winningNumbers.includes(num)).length;
}

/**
 * 로또 번호와 당첨 번호를 비교하여 순위를 반환합니다.
 */
export function getPrizeRank(
  ticket: number[],
  winningNumbers: number[],
  bonus: number
): string {
  const matches = checkMatches(ticket, winningNumbers);

  if (matches === 6) return '1등';
  if (matches === 5 && ticket.includes(bonus)) return '2등';
  if (matches === 5) return '3등';
  if (matches === 4) return '4등';
  if (matches === 3) return '5등';
  return '낙첨';
}
