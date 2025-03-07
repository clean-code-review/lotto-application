import { useState } from 'react';
import { generateMultipleLottoNumbers } from '../utils/lottoUtils';

export function useLottoSet() {
  const [lottoSets, setLottoSets] = useState<number[][]>([]);

  const handleGenerate = (count: number) => {
    const newLottoSets = generateMultipleLottoNumbers(count);
    setLottoSets(newLottoSets);
  };

  return { lottoSets, handleGenerate };
}
