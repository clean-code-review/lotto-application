import { Button } from '@hensley-ui/ui'
import { useLotteryResult } from '../hooks/useLotteryResult'
import { useWinningNumbersInput } from '../hooks/useWinninNumbersInput'
import { WinningNumbersInput } from './WinningNumbersInput'
import Swal from 'sweetalert2'

type LotteryTicketWinningCheckProps = {
  tickets: string[]
}
export const LotteryTicketWinningCheck = ({
  tickets,
}: LotteryTicketWinningCheckProps) => {
  const { getWinningResult, showWinningResult } = useLotteryResult(tickets)

  const {
    winningNumbers,
    bonusNumber,
    error,
    inputRefs,
    bonusInputRef,
    handleWinningNumberChange,
    handleBonusNumberChange,
    validateInputs,
  } = useWinningNumbersInput()

  const handleLotteryResult = () => {
    /* 당첨 결과 확인 */
    try {
      if (!validateInputs()) return
      const result = getWinningResult(winningNumbers, bonusNumber)
      if (result) {
        showWinningResult(result)
      }
    } catch (error) {
      Swal.fire({
        title: `${error}`,
      })
    }
  }

  return (
    <div>
      <h1>당첨번호</h1>
      <div className="number-input-group">
        {/* 당첨 번호 입력 */}
        <WinningNumbersInput
          winningNumbers={winningNumbers}
          bonusNumber={bonusNumber}
          error={error}
          onWinningNumberChange={handleWinningNumberChange}
          onBonusNumberChange={handleBonusNumberChange}
          inputRefs={inputRefs}
          bonusInputRef={bonusInputRef}
        />
      </div>
      <Button variant={'default'} onClick={handleLotteryResult}>
        결과확인하기
      </Button>
    </div>
  )
}
