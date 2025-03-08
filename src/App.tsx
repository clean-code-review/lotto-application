import './App.css'
import { Heading } from '@hensley-ui/ui'
import { LottoPurchaseForm } from './components/LottoPurchaseForm'
import { LottoPurchaseFormOnDetail } from './components/LottoPurchaseFormOnDetail'
import { useLotteryPurchased } from './hooks/useLotteryPurchased'

function App() {
  const { lotteryTickets, handleBuyTicket } = useLotteryPurchased()

  return (
    <>
      <header>
        <Heading as={'h1'}>행운의 로또</Heading>
      </header>
      <main>
        <LottoPurchaseForm
          label={'구입할 금액을 입력해주세요'}
          clickSubmitForm={handleBuyTicket}
        />
        {lotteryTickets && (
          <LottoPurchaseFormOnDetail lotteryTickets={lotteryTickets} />
        )}
      </main>
    </>
  )
}

export default App
