function LottoResult({
  winningNumber,
  bonusNumber,
  totalResults,
}: {
  winningNumber: number[];
  bonusNumber: number;
  totalResults: number[];
}) {
  return (
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
    </div>
  );
}

export default LottoResult;
