import { PropsWithChildren } from 'react'

export const LotteryPanel = ({
  isVisible,
  children,
}: { isVisible: boolean } & PropsWithChildren) => {
  return isVisible && <div>{children}</div>
}
