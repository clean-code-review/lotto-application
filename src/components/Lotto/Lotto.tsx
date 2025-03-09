import './lotto.css';
import LottoPurchase from './components/LottoPurchase';
import useLotto from './hooks/useLotto';
import LottoNumbers from './components/LottoNumbers';
import LottoResult from './components/LottoResult';

function Lotto() {
  const {
    lottoNumbers,
    winningNumber,
    bonusNumber,
    totalResults,
    getWinningNumber,
    getResult,
    reset,
    purchaseLottos,
  } = useLotto();

  const handleCheckResult = () => {
    getWinningNumber();
    getResult();
  };

  return (
    <div className="lotto-wrapper">
      <div className="lotto">
        <h1>로또 어플리케이션</h1>

        <LottoPurchase onPurchase={purchaseLottos} />

        {!!lottoNumbers.length && (
          <>
            <LottoNumbers lottoNumbers={lottoNumbers} />
            <button onClick={handleCheckResult}>결과확인</button>
          </>
        )}

        {!!totalResults.length && (
          <>
            <LottoResult
              winningNumber={winningNumber}
              bonusNumber={bonusNumber}
              totalResults={totalResults}
            />
            <button onClick={reset}>처음부터 다시하기</button>
          </>
        )}
      </div>
    </div>
  );
}

export default Lotto;
