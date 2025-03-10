import { useMemo, useState } from 'react'
import { LotteryService } from '../domain/lottery/LotteryService'
import Swal from 'sweetalert2'
import { NonNullableA } from '../type'
import { WinningNumbers } from './useWinninNumbersInput'

type LotteryTicket = string

export const useLotteryResult = (tickets: LotteryTicket[]) => {
  const [error, setError] = useState<string | null>(null)

  const lotteryService = useMemo(() => new LotteryService(), [])

  const getWinningResult = (
    winningNumbers: WinningNumbers,
    bonusNumber: number,
  ) => {
    try {
      const result = lotteryService.getWinningResult(
        tickets,
        bonusNumber,
        winningNumbers,
      )
      return result
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      } else {
        setError('결과 계산 중 오류가 발생했습니다.')
      }
      return null
    }
  }

  const showWinningResult = ({
    totalWinningCount,
    totalBonusWinningCount,
  }: NonNullableA<ReturnType<typeof getWinningResult>>) => {
    /* totalWinningCount[일치하는 로또 넘버 개수] = 티켓 개수 */
    Swal.fire({
      title: '당첨 통계',
      html: `<div>
          <p>3개 일치 (5,000원)- ${totalWinningCount[3]}개</p>
          <p>4개 일치 (50,000원) - ${totalWinningCount[4]}개</p>
          <p>5개 일치(1,500,000원) - ${totalWinningCount[5]}개 </p>
          <p>5개 일치 보너스 볼 일치 (30,000,000원) - ${totalBonusWinningCount}개</p>
          <p>6개 일치 (2,000,000,000원) - ${totalWinningCount[6]}개 </p>
        </div>`,
      icon: 'success',
      confirmButtonText: '확인',
      allowOutsideClick: false,
    }).then(() => {
      //TODO: 선언적으로 접근하는 방식 고려해보기
      window.location.replace(window.location.href)
    })
  }
  return {
    error,
    getWinningResult,
    showWinningResult,
  }
}
