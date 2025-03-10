export class LotteryRules {
  static readonly PRICE_PER_TICKET: number = 1000
  static readonly MIN_NUMBER: number = 1
  static readonly MAX_NUMBER: number = 45
  static readonly NUMBERS_PER_TICKET: number = 6

  constructor(
    public readonly pricePerTicket: number = LotteryRules.PRICE_PER_TICKET,
    public readonly minNumber: number = LotteryRules.MIN_NUMBER,
    public readonly maxNumber: number = LotteryRules.MAX_NUMBER,
    public readonly numbersPerTicket: number = LotteryRules.NUMBERS_PER_TICKET,
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
