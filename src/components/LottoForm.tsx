import { useState } from 'react';

interface LottoFormProps {
  onGenerate: (count: number) => void;
}

const LottoForm = ({ onGenerate }: LottoFormProps) => {
  const [count, setCount] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(count);
  };

  return (
    <form onSubmit={handleSubmit} className='lotto-form'>
      <label htmlFor='ticket-count'>로또 티켓 개수:</label>
      <input
        id='ticket-count'
        type='number'
        min='1'
        max='10'
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
      />
      <button type='submit'>번호 생성</button>
    </form>
  );
};

export default LottoForm;
