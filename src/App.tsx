import { useState } from 'react';
import './App.css';
import { LottoForm } from './components/LottoForm';
import { LottoTicket } from './components/LottoTicket';
import { WinningNumberDisplay } from './components/WinningNumberDisplay';
import { LottoResult } from './components/LottoResult';
import {
  generateMultipleLottoNumbers,
  generateWinningNumbers,
} from './utils/lottoUtils';

export default function App() {
  const [lottoSets, setLottoSets] = useState<number[][]>([]);
  const [winningNumbers, setWinningNumbers] = useState<{
    numbers: number[];
    bonus: number;
  } | null>(null);

  const handleGenerate = (count: number) => {
    const newLottoSets = generateMultipleLottoNumbers(count);
    setLottoSets(newLottoSets);
  };

  const handleGenerateWinning = () => {
    const winning = generateWinningNumbers();
    setWinningNumbers(winning);
  };

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
