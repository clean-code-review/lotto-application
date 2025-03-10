import './App.css'
import { Heading } from '@hensley-ui/ui'
import { useLotteryPurchased } from './hooks/useLotteryPurchased'
import { Form as LotteryPurchaseForm } from './components/Form'
import { LotteryTicketList } from './components/LotteryTicketList'
import { LotteryPanel } from './components/LotteryPanel'
import { LotteryTicketWinningCheck } from './components/LotteryTicketWinningCheck'

function App() {
  const lottery = useLotteryPurchased()
  const hasTicket =
    Array.isArray(lottery.lotteryTickets) && lottery.lotteryTickets?.length > 0
  return (
    <>
      <Heading as={'h1'}>행운의 로또</Heading>
      <LotteryPurchaseForm
        labelText="구입할 금액을 입력해 주세요"
        labelHtmlFor="amount"
        inputType="number"
        placeholder="1000"
        buttonText="확인"
        onSubmit={(value: string) => lottery.purchaseTickets(Number(value))}
        error=" "
      />
      <LotteryPanel isVisible={hasTicket}>
        <LotteryTicketList tickets={lottery.lotteryTickets || []} />
        <LotteryTicketWinningCheck tickets={lottery.lotteryTickets || []} />
      </LotteryPanel>
    </>
  )
}

export default App
