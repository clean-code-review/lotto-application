import { checkMatches, getPrizeRank } from '../utils/lottoUtils';

interface LottoResultProps {
  userTicket: number[];
  winningNumbers: number[];
  bonus: number;
  ticketNumber: number;
}

export const LottoResult = ({
  userTicket,
  winningNumbers,
  bonus,
}: LottoResultProps) => {
  const matches = checkMatches(userTicket, winningNumbers);
  const rank = getPrizeRank(userTicket, winningNumbers, bonus);

  return (
    <div className={`result-info ${rank !== '낙첨' ? 'winning' : ''}`}>
      <span className='match-count'>{matches}개 일치</span>
      <span className={`rank ${rank !== '낙첨' ? 'won' : 'lost'}`}>{rank}</span>
    </div>
  );
};
