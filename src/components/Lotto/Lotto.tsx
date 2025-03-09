import { useState } from 'react';
import './lotto.css';

const LOTTO_PRICE = 1000;
const LOTTO_NUMBER_RANGE_MIN = 1;
const LOTTO_NUMBER_RANGE_MAX = 45;
const LOTTO_NUMBER_COUNT = 6;

const checkValidPurchasePrice = (lottoPurchasePrice: number) => {
  return lottoPurchasePrice % LOTTO_PRICE === 0;
};

const buyLotto = (lottoPurchasePrice: number) => {
  const lottoNumbers = [];
  const lottoCount = lottoPurchasePrice / LOTTO_PRICE;

  for (let i = 0; i < lottoCount; i++) {
    lottoNumbers.push(generateLottoNumber());
  }

  return lottoNumbers;
};

const generateLottoNumber = () => {
  const numbers: number[] = [];

  while (numbers.length < LOTTO_NUMBER_COUNT) {
    const number = pickRandomLottoNumber();

    const isDuplicate = numbers.includes(number);
    if (isDuplicate) continue;
    numbers.push(number);
  }

  return numbers.sort((a, b) => a - b);
};

const pickRandomLottoNumber = () => {
  const number = Math.floor(
    Math.random() * (LOTTO_NUMBER_RANGE_MAX - LOTTO_NUMBER_RANGE_MIN) +
      LOTTO_NUMBER_RANGE_MIN,
  );

  return number;
};

const generateWinningNumber = () => {
  const lottoWinningNumber = generateLottoNumber();
  const bonusNumber = pickRandomLottoNumber();
  return { lottoWinningNumber, bonusNumber };
};

const checkWinnings = (
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

const checkResult = (
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

function Lotto() {
  const [lottoPurchasePrice, setLottoPurchasePrice] = useState(0);
  const [lottoNumbers, setLottoNumbers] = useState<number[][]>([]);
  const [winningNumber, setWinningNumber] = useState<number[]>([]);
  const [bonusNumber, setBonusNumber] = useState(0);
  const [totalResults, setTotalResults] = useState<number[]>([]);

  const handleLottoPurchase = () => {
    const isValidPrice = checkValidPurchasePrice(lottoPurchasePrice);

    if (!isValidPrice) {
      alert('1000원 단위로 입력해주세요.');
      return setLottoPurchasePrice(0);
    }

    const lottoNumbers = buyLotto(lottoPurchasePrice);
    setLottoNumbers(lottoNumbers);
  };

  const handleCheckResult = () => {
    const { lottoWinningNumber, bonusNumber } = generateWinningNumber();
    setWinningNumber(lottoWinningNumber);
    setBonusNumber(bonusNumber);

    const results = checkResult(lottoWinningNumber, bonusNumber, lottoNumbers);
    setTotalResults(results);
  };

  const handleReset = () => {
    setLottoPurchasePrice(0);
    setLottoNumbers([]);
    setWinningNumber([]);
    setBonusNumber(0);
    setTotalResults([]);
  };

  return (
    <div className="lotto-wrapper">
      <div className="lotto">
        <h1>로또 어플리케이션</h1>

        <div className="input">
          <label htmlFor="lotto-input">로또 구매 금액</label>
          <input
            id="lotto-input"
            type="number"
            value={lottoPurchasePrice}
            onChange={e => setLottoPurchasePrice(parseInt(e.target.value))}
          />
          <button onClick={handleLottoPurchase}>구매</button>
        </div>

        {!!lottoNumbers.length && (
          <div className="lotto-numbers">
            <h2>구매한 로또 번호</h2>
            <div className="lotto-numbers-list">
              {lottoNumbers.map((lottoNumber, index) => (
                <div key={index}>{lottoNumber.join(', ')}</div>
              ))}
            </div>
            <button onClick={handleCheckResult}>결과확인</button>
          </div>
        )}

        {!!totalResults.length && (
          <div className="result">
            <div className="winning-number">
              <h2>딩첨번호</h2>
              <p>
                {winningNumber.join(', ')}
                <span>+{bonusNumber}</span>
              </p>
            </div>

            <div>
              <h2>당첨결과</h2>
              <div>
                {totalResults.slice(1).map((val, idx) => (
                  <p>
                    {idx + 1}등: {val}개
                  </p>
                ))}
                <p>꽝: {totalResults[0]}개</p>
              </div>
            </div>

            <button onClick={handleReset}>처음부터 다시하기</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Lotto;
