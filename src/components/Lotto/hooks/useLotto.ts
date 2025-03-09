import { useState } from 'react';
import {
  buyLottos,
  generateResult,
  generateWinningNumber,
} from '../utils/lotto';

// NOTE: useLotto 의 역할은?
// 한회차의 로또라고 생각했다.
// 로또 한회차에는 당첨번호, 보너스번호가 있다.
// 로또 한회차에는 여러명이 구매한 로또 번호가 있다.
// 로또 한회차에는 한명이 여러번의 로또를 구매할 수 있다.
// 로또 고유의 규칙이 존재한다.
function useLotto() {
  const [lottoNumbers, setLottoNumbers] = useState<number[][]>([]);
  const [winningNumber, setWinningNumber] = useState<number[]>([]);
  const [bonusNumber, setBonusNumber] = useState(0);
  const [totalResults, setTotalResults] = useState<number[]>([]);

  const purchaseLottos = (lottoPurchasePrice: number) => {
    const lottoNumbers = buyLottos(lottoPurchasePrice);
    setLottoNumbers(lottoNumbers);
  };

  const getWinningNumber = () => {
    const { lottoWinningNumber, bonusNumber } = generateWinningNumber();
    setWinningNumber(lottoWinningNumber);
    setBonusNumber(bonusNumber);
  };

  const getResult = () => {
    const results = generateResult(winningNumber, bonusNumber, lottoNumbers);
    setTotalResults(results);
  };

  const reset = () => {
    setLottoNumbers([]);
    setWinningNumber([]);
    setBonusNumber(0);
    setTotalResults([]);
  };

  return {
    getWinningNumber,
    getResult,
    purchaseLottos,
    reset,
    totalResults,
    lottoNumbers,
    winningNumber,
    bonusNumber,
  };
}

export default useLotto;
