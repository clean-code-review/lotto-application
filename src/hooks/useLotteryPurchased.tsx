import { useCallback, useMemo, useState } from 'react'
import { LotteryService } from '../domain/lottery/LotteryService'

export const useLotteryPurchased = () => {
  const [lotteryTickets, setTickets] = useState<string[]>([])

  const lotteryService = useMemo(() => new LotteryService(), [])

  const purchaseTickets = useCallback(
    (amount: number) => {
      const { tickets } = lotteryService.purchaseTickets(amount)
      setTickets((prev) => [...prev, ...tickets])
    },
    [lotteryService],
  )

  return {
    lotteryTickets,
    purchaseTickets,
    clearTickets: () => setTickets([]),
  }
}
