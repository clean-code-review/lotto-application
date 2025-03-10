// application/hooks/useWinningNumbersInput.ts
// 당첨 번호 입력을 관리하는 훅
import { useState, useRef, ChangeEvent } from 'react'
import { debounce } from 'lodash'

type LottoNumbers = [number, number, number, number, number, number]

export function useWinningNumbersInput() {
  const [winningNumbers, setWinningNumbers] = useState<LottoNumbers>([
    0, 0, 0, 0, 0, 0,
  ])
  const [bonusNumber, setBonusNumber] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const bonusInputRef = useRef<HTMLInputElement | null>(null)

  // 다음 입력 필드로 포커스 이동 (디바운스 처리)
  const moveFocusToNext = debounce((currentIdx: number, value: number) => {
    if (value > 0 && currentIdx < 5) {
      inputRefs.current[currentIdx + 1]?.focus()
    } else if (value > 0 && currentIdx === 5) {
      bonusInputRef.current?.focus()
    }
  }, 300)

  // 당첨 번호 입력 핸들러
  const handleWinningNumberChange = (
    e: ChangeEvent<HTMLInputElement>,
    idx: number,
  ) => {
    const value = e.target.value

    if (value === '' || /^\d+$/.test(value)) {
      const numberValue = value === '' ? 0 : Math.min(parseInt(value), 45)

      const newNumbers = [...winningNumbers] as LottoNumbers
      newNumbers[idx] = numberValue
      setWinningNumbers(newNumbers)

      if (numberValue > 0) {
        moveFocusToNext(idx, numberValue)
      }

      setError(null)
    }
  }

  // 보너스 번호 입력 핸들러
  const handleBonusNumberChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (value === '' || /^\d+$/.test(value)) {
      const numberValue = value === '' ? 0 : Math.min(parseInt(value), 45)
      setBonusNumber(numberValue)
      setError(null)
    }
  }

  // 입력값 검증
  const validateInputs = (): boolean => {
    // 당첨 번호 범위 검증
    if (winningNumbers.some((num) => num <= 0 || num > 45)) {
      setError('모든 당첨 번호를 1부터 45 사이로 입력해주세요.')
      return false
    }

    // 보너스 번호 범위 검증
    if (bonusNumber <= 0 || bonusNumber > 45) {
      setError('보너스 번호를 1부터 45 사이로 입력해주세요.')
      return false
    }

    // 당첨 번호 중복 검증
    const uniqueNumbers = new Set(winningNumbers)
    if (uniqueNumbers.size !== 6) {
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
