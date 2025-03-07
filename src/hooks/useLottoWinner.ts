import { useState } from 'react';
import { generateWinningNumbers } from '../utils/lottoUtils';

export function useLottoWinner() {
  const [winningNumbers, setWinningNumbers] = useState<{
    numbers: number[];
    bonus: number;
  } | null>(null);

  const handleGenerateWinning = () => {
    const winning = generateWinningNumbers();
    setWinningNumbers(winning);
  };

  return { winningNumbers, handleGenerateWinning };
}
