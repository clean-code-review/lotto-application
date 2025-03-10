import { useState, useRef, ChangeEvent } from 'react'
import { debounce } from 'lodash'
import { LotteryRules } from '../domain/lottery/LotteryRules'

// TODO: 튜플로 시도는 괜찮은것 같지만, 현재 코드에 효용성이 있는가? 고민필요.
export type WinningNumbers = [number, number, number, number, number, number]

// 당첨 번호 입력을 관리하는 훅
export function useWinningNumbersInput() {
  const [winningNumbers, setWinningNumbers] = useState<WinningNumbers>([
    0, 0, 0, 0, 0, 0,
  ])
  const [bonusNumber, setBonusNumber] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const bonusInputRef = useRef<HTMLInputElement | null>(null)

  // 다음 입력 필드로 포커스 이동 (디바운스 처리)
  // TODO: 300대신 인자로 받기 ms
  const moveFocusToNext = debounce((currentInputIdx: number, value: number) => {
    if (value > 0 && currentInputIdx < LotteryRules.NUMBERS_PER_TICKET - 1) {
      inputRefs.current[currentInputIdx + 1]?.focus()
    } else if (
      value > 0 &&
      currentInputIdx === LotteryRules.NUMBERS_PER_TICKET - 1
    ) {
      bonusInputRef.current?.focus()
    }
  }, 300)

  // 당첨 번호 입력 핸들러
  // TODO: [REFACTOR] 검증 로직 DRY 개선하기
  const handleWinningNumberChange = (
    e: ChangeEvent<HTMLInputElement>,
    currentInputIdx: number,
  ) => {
    const value = e.target.value
    const isNumber = /^\d+$/.test(value)
    if (value === '' || isNumber) {
      const numberValue =
        value === '' ? 0 : Math.min(parseInt(value), LotteryRules.MAX_NUMBER)

      const newNumbers = [...winningNumbers] as WinningNumbers // as를 써줘야 함. 튜플을 사용할 필요가 있을까? 고민
      newNumbers[currentInputIdx] = numberValue
      setWinningNumbers(newNumbers)

      if (numberValue > 0) {
        moveFocusToNext(currentInputIdx, numberValue)
      }

      setError(null)
    }
  }
  // validation의 관심사가 정말 여기일까?고민해보기
  // 보너스 번호 입력 핸들러
  const handleBonusNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    const isNumber = /^\d+$/.test(value)
    if (value === '' || isNumber) {
      const numberValue = value === '' ? 0 : Math.min(parseInt(value), 45)
      setBonusNumber(numberValue)
      setError(null)
    }
  }

  // 입력값 검증
  const validateInputs = (): boolean => {
    // 당첨 번호 범위 검증
    if (
      winningNumbers.some((num) => num <= 0 || num > LotteryRules.MAX_NUMBER)
    ) {
      setError(
        `모든 당첨 번호를  ${LotteryRules.MIN_NUMBER}부터 ${LotteryRules.MAX_NUMBER} 사이로 입력해주세요.`,
      )
      return false
    }

    // 보너스 번호 범위 검증
    if (bonusNumber <= 0 || bonusNumber > LotteryRules.MAX_NUMBER) {
      setError(
        `보너스 번호를 ${LotteryRules.MIN_NUMBER}부터 ${LotteryRules.MAX_NUMBER} 사이로 입력해주세요.`,
      )
      return false
    }

    // 당첨 번호 중복 검증
    const uniqueNumbers = new Set(winningNumbers)
    if (uniqueNumbers.size !== LotteryRules.NUMBERS_PER_TICKET) {
      setError('당첨 번호에 중복된 숫자가 있습니다.')
      return false
    }

    // 보너스 번호와 당첨 번호 중복 검증
    if (winningNumbers.includes(bonusNumber)) {
      setError('보너스 번호는 당첨 번호와 중복될 수 없습니다.')
      return false
    }

    return true
  }

  return {
    winningNumbers,
    bonusNumber,
    error,
    inputRefs,
    bonusInputRef,
    handleWinningNumberChange,
    handleBonusNumberChange,
    validateInputs,
    setError,
    clearError: () => setError(null),
  }
}
