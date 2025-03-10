import { FormEvent, useState } from 'react'

type FormProps = {
  onSubmit: (value: string) => void
  labelText: string
  labelHtmlFor: string
  placeholder: string
  buttonText: string
  inputType: string
  error?: string
  inputProps?: string
}

export const Form = ({
  onSubmit,
  labelText,
  labelHtmlFor,
  placeholder,
  buttonText,
  inputType,
  error,
  ...inputProps
}: FormProps) => {
  const [input, setInput] = useState('')
  const handleOnSubmit = (e: FormEvent) => {
    console.log('handleSubmit')
    e.preventDefault()
    onSubmit(input)
  }

  return (
    <div>
      <form onSubmit={handleOnSubmit}>
        <div className="input-group">
          <label htmlFor={labelHtmlFor}>{labelText}</label>
          <input
            type={inputType}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            {...inputProps}
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit" className="confirm-btn">
          {buttonText}
        </button>
      </form>
    </div>
  )
}
