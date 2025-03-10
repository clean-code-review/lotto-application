type LotteryTicketListProps = {
  tickets: string[]
}

export const LotteryTicketList = ({ tickets }: LotteryTicketListProps) => {
  return (
    <>
      {tickets.map((ticket, id) => (
        <Ticket ticket={ticket} key={id.toString()} />
      ))}
    </>
  )
}

export const Ticket = ({ ticket }: { ticket: string }) => {
  return <p>{ticket}</p>
}
