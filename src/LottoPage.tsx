import './LottoPage.css';
import {
  LottoForm,
  LottoTicket,
  WinningNumberDisplay,
  LottoResult,
} from './components';
import { useLottoSet, useLottoWinner } from './hooks';

export default function LottoPage() {
  const { lottoSets, handleGenerate } = useLottoSet();
  const { winningNumbers, handleGenerateWinning } = useLottoWinner();

  return (
    <div className='lotto-app'>
      <h1>로또 번호 생성기</h1>
      <LottoForm onGenerate={handleGenerate} />

      {lottoSets.length > 0 && (
        <div className='lotto-results'>
          <h2>생성된 로또 번호</h2>
          {lottoSets.map((numbers, index) => (
            <div key={index} className='ticket-container'>
              <span className='ticket-number'>#{index + 1}</span>
              <LottoTicket numbers={numbers} />
              {winningNumbers && (
                <LottoResult
                  userTicket={numbers}
                  winningNumbers={winningNumbers.numbers}
                  bonus={winningNumbers.bonus}
                  ticketNumber={index + 1}
                />
              )}
            </div>
          ))}

          <div className='winning-section'>
            <button
              className='generate-winning-btn'
              onClick={handleGenerateWinning}
            >
              당첨 번호 생성하기
            </button>

            {winningNumbers && (
              <div className='winning-display'>
                <h3>당첨 번호</h3>
                <WinningNumberDisplay
                  numbers={winningNumbers.numbers}
                  bonus={winningNumbers.bonus}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
