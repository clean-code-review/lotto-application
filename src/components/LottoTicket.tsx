interface LottoTicketProps {
  numbers: number[];
}

const LottoTicket = ({ numbers }: LottoTicketProps) => {
  return (
    <div className='lotto-ticket'>
      {numbers.map((number, index) => (
        <div key={index} className='lotto-ball'>
          {number}
        </div>
      ))}
    </div>
  );
};

export default LottoTicket;
