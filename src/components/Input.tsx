import { ChangeEvent, ComponentProps, Ref } from 'react'

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement>, idx: number) => void
  inputRef?: Ref<HTMLInputElement>
  value: string
} & Omit<ComponentProps<'input'>, 'onChange' | 'inputRef' | 'value'>

export const Input = ({
  value,
  inputRef,
  onChange,

  ...restProps
}: Props) => {
  const handleChange = (e) => {
    onChange(e, inputRef)
  }
  return (
    <input
      ref={inputRef}
      onChange={handleChange}
      value={value}
      {...restProps}
    />
  )
}
