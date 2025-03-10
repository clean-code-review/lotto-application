export class LotteryRules {
  constructor(
    public readonly pricePerTicket: number = 1000,
    public readonly minNumber: number = 1,
    public readonly maxNumber: number = 45,
    public readonly numbersPerTicket: number = 6,
  ) {}

  calculateTicketCount(amount: number): number {
    return Math.floor(amount / this.pricePerTicket)
  }

  validateNumber(number: number): boolean {
    return number >= this.minNumber && number <= this.maxNumber
  }

  countWinningNumbers({
    bonusNumber,
    winningNumbers,
    lottoTicketNumbers,
  }: {
    bonusNumber: number
    winningNumbers: number[]
    lottoTicketNumbers: number[]
  }): { bonusNumberCount: number; winningCount: number } {
    const uniqueWinningNumbers = new Set(winningNumbers)
    const winningCount = lottoTicketNumbers.filter((num) =>
      uniqueWinningNumbers.has(num),
    ).length
    return {
      bonusNumberCount: uniqueWinningNumbers.has(bonusNumber) ? 1 : 0,
      winningCount,
    }
  }
}
