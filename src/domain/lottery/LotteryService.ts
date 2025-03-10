import { LotteryRules } from './LotteryRules'

/**
 * 로또 게임 관련 서비스를 제공하는 클래스
 */
export class LotteryService {
  /**
   * LotteryService 생성자
   * @param rules 로또 게임 규칙 객체. 기본값으로 새 LotteryRules 인스턴스 사용
   */
  constructor(private readonly rules: LotteryRules = new LotteryRules()) {}

  /**
   * 입력된 금액으로 구매 가능한 로또 티켓 수량을 계산
   * @param amount 입력 금액
   * @returns 구매 가능한 티켓 수량
   */
  calculateTicketCount(amount: number): number {
    return this.rules.calculateTicketCount(amount)
  }

  /**
   * 단일 로또 티켓의 번호 조합 생성
   * @returns 쉼표로 구분된 로또 번호 문자열 (예: "1,7,13,29,34,45")
   */
  generateTicket(): string {
    const numbers = new Set<number>()
    console.log('this,rules', this.rules)
    while (numbers.size < this.rules.numbersPerTicket) {
      const randomNumber =
        Math.floor(
          Math.random() * (this.rules.maxNumber - this.rules.minNumber + 1),
        ) + this.rules.minNumber
      numbers.add(randomNumber)
    }

    return Array.from(numbers)
      .sort((a, b) => a - b)
      .join(',')
  }

  /**
   * 여러 장의 로또 티켓 번호 조합 생성
   * @param count 생성할 티켓 수량
   * @returns 쉼표로 구분된 로또 번호 문자열 배열
   */
  generateMultipleTickets(count: number): string[] {
    return Array(count)
      .fill(0)
      .map(() => this.generateTicket())
  }

  /**
   * 입력된 금액으로 로또 티켓 구매 실행
   * @param amount 입력 금액
   * @returns 구매한 티켓 번호 목록과 수량을 포함한 객체
   */
  purchaseTickets(amount: number): {
    tickets: string[]
    ticketCount: number
  } {
    const ticketCount = this.calculateTicketCount(amount)
    const tickets = this.generateMultipleTickets(ticketCount)

    return { tickets, ticketCount }
  }

  getWinningResult(
    lottoTickets: string[],
    bonusNumber: number,
    winningNumbers: number[],
  ) {
    const totalWinningCount = Array(this.rules.numbersPerTicket + 1).fill(0) //[1,4 ] 0개 맞은 티켓의 개수 1,
    let totalBonusWinningCount = 0
    lottoTickets.forEach((lottoTicketNumbers) => {
      const { bonusNumberCount, winningCount } = this.rules.countWinningNumbers(
        {
          bonusNumber,
          lottoTicketNumbers: lottoTicketNumbers.split(',').map(Number),
          winningNumbers,
        },
      )
      if (winningCount === 5 && bonusNumberCount) {
        totalBonusWinningCount += 1
        return
      }

      totalWinningCount[winningCount] += 1
    })

    return { totalWinningCount, totalBonusWinningCount }
  }
}
