type TextareaProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  disabled?: boolean
  maxLength?: number
  rows?: number
}

export default function Textarea({
  value,
  onChange,
  placeholder,
  disabled = false,
  maxLength,
  rows = 3,
}: TextareaProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      maxLength={maxLength}
      rows={rows}
    />
  )
}