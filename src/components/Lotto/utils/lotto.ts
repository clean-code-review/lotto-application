import { pickRandomNumber } from './numbers';

/**
 * 로또 관련 유틸 함수
 */

const LOTTO_PRICE = 1000;
const LOTTO_NUMBER_RANGE_MIN = 1;
const LOTTO_NUMBER_RANGE_MAX = 45;
const LOTTO_NUMBER_COUNT = 6;

// 로또 구매 금액 유효성 검사
export const checkValidPurchasePrice = (lottoPurchasePrice: number) => {
  return lottoPurchasePrice % LOTTO_PRICE === 0;
};

// 로또 한장 생성
export const generateLottoNumber = () => {
  const numbers: number[] = [];

  while (numbers.length < LOTTO_NUMBER_COUNT) {
    const number = pickRandomNumber(
      LOTTO_NUMBER_RANGE_MIN,
      LOTTO_NUMBER_RANGE_MAX,
    );

    const isDuplicate = numbers.includes(number);
    if (isDuplicate) continue;
    numbers.push(number);
  }

  return numbers.sort((a, b) => a - b);
};

// 로또 구매
export const buyLottos = (lottoPurchasePrice: number) => {
  const lottoNumbers = [];
  const lottoCount = lottoPurchasePrice / LOTTO_PRICE;

  for (let i = 0; i < lottoCount; i++) {
    lottoNumbers.push(generateLottoNumber());
  }

  return lottoNumbers;
};

// 당첨번호 생성
export const generateWinningNumber = () => {
  const lottoWinningNumber = generateLottoNumber();
  const bonusNumber = pickRandomNumber(
    LOTTO_NUMBER_RANGE_MIN,
    LOTTO_NUMBER_RANGE_MAX,
  );
  return { lottoWinningNumber, bonusNumber };
};

// 당첨 결과 확인
export const checkWinnings = (
  winningNumber: number[],
  bonusNumber: number,
  lottoNumber: number[],
) => {
  let matchCounts = 0;
  const hasBonusNumber = lottoNumber.includes(bonusNumber);

  lottoNumber.map(number =>
    winningNumber.includes(number) ? matchCounts++ : null,
  );

  switch (matchCounts) {
    case 3:
      return 5;
    case 4:
      return 4;
    case 5:
      return hasBonusNumber ? 2 : 3;
    case 6:
      return 1;
    default:
      return 0;
  }
};

// 당첨 결과 생성
export const generateResult = (
  winningNumber: number[],
  bonusNumber: number,
  lottoNumbers: number[][],
) => {
  const totalResults = [0, 0, 0, 0, 0, 0];

  lottoNumbers.map(lotto => {
    const winning = checkWinnings(winningNumber, bonusNumber, lotto);
    totalResults[winning] += 1;
  });

  return totalResults;
};
