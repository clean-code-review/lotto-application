import { FormEvent, useState } from 'react'

type LottoPurchasedFormProps = {
  lotteryTickets: number[][] | null
  clickSubmitForm: (amount: number) => void
}

export const LottoPurchaseForm = ({
  clickSubmitForm,
}: LottoPurchasedFormProps) => {
  const [amount, setAmount] = useState<string>('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (amount && !isNaN(parseInt(amount)) && parseInt(amount) > 0) {
      clickSubmitForm(parseInt(amount))
      setAmount('')
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group">
        <label htmlFor="amount">구입할 금액을 입력해주세요.</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="1000"
        />
      </div>
      <button type="submit" className="confirm-btn">
        확인
      </button>
    </form>
  )
}
