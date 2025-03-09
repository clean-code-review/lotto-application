function LottoNumbers({ lottoNumbers }: { lottoNumbers: number[][] }) {
  return (
    <div className="lotto-numbers">
      <h2>구매한 로또 번호</h2>
      <div className="lotto-numbers-list">
        {lottoNumbers.map((lottoNumber, index) => (
          <div key={index}>{lottoNumber.join(', ')}</div>
        ))}
      </div>
    </div>
  );
}

export default LottoNumbers;
