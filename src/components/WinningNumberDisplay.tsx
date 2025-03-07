import { LottoTicket } from './LottoTicket';

interface WinningNumberDisplayProps {
  numbers: number[];
  bonus: number;
}

export const WinningNumberDisplay = ({
  numbers,
  bonus,
}: WinningNumberDisplayProps) => {
  return (
    <div className='winning-numbers'>
      <div className='winning-main'>
        <LottoTicket numbers={numbers} />
      </div>
      <div className='bonus-number'>
        <span>보너스</span>
        <div className={`lotto-ball number-${bonus}`}>{bonus}</div>
      </div>
    </div>
  );
};
