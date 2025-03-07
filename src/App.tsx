import { useState } from 'react';
import './App.css';
import LottoForm from './components/LottoForm';
import LottoTicket from './components/LottoTicket';
import { generateMultipleLottoNumbers } from './utils/lottoUtils';

export default function App() {
  const [lottoSets, setLottoSets] = useState<number[][]>([]);
  const handleGenerate = (count: number) => {
    const newLottoSets = generateMultipleLottoNumbers(count);
    setLottoSets(newLottoSets);
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
