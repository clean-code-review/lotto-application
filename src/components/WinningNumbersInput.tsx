import React, { RefObject } from 'react'
import { Input } from './Input'
import { Heading } from '@hensley-ui/ui'

interface WinningNumbersInputProps {
  winningNumbers: number[]
  bonusNumber: number
  error: string | null
  onWinningNumberChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number,
  ) => void
  onBonusNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  inputRefs: RefObject<(HTMLInputElement | null)[]>
  bonusInputRef: RefObject<HTMLInputElement | null>
}

export const WinningNumbersInput: React.FC<WinningNumbersInputProps> = ({
  winningNumbers,
  bonusNumber,
  error,
  onWinningNumberChange,
  onBonusNumberChange,
  inputRefs,
  bonusInputRef,
}) => {
  return (
    <div className="winning-numbers-input">
      <Heading as={'h4'}>당첨 번호 입력</Heading>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          {/* 당첨 번호 입력 필드 */}
          {winningNumbers.map((num, idx) => (
            <Input
              key={idx}
              type="text"
              style={{ width: '20px' }}
              inputMode="numeric"
              value={num === 0 ? '' : num.toString()}
              onChange={(e) => onWinningNumberChange(e, idx)}
              ref={(node: HTMLInputElement | null) => {
                if (inputRefs?.current) {
                  inputRefs.current[idx] = node
                }
              }}
              aria-label={`당첨 번호 ${idx + 1}`}
            />
          ))}
        </div>
        {/* 보너스 번호 입력 필드 */}
        <Input
          value={bonusNumber === 0 ? '' : bonusNumber.toString()}
          onChange={onBonusNumberChange}
          ref={bonusInputRef}
          inputMode="numeric" // 모바일에서 숫자 키패드
          pattern="[0-9]*"
          placeholder="보너스번호"
          min={1}
          max={45}
          maxLength={2}
          aria-label="보너스 번호"
          style={{ width: '20px', marginLeft: '2rem' }}
        />
      </div>

      {/* 에러 메시지 */}
      {error && <div>{error}</div>}
    </div>
  )
}
